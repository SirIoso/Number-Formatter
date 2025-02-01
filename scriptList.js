    function convertToList(input) {
        // Split the input based on spaces, commas, and newlines
        const itemsArray = input.split(/[, \n]+/);

        // Create an empty array to store the formatted items
        const resultList = [];

        // Loop through the itemsArray and format each item
        itemsArray.forEach((item) => {
            if (item.trim() !== '') {
                // Add the item to the resultList with the desired format
                resultList.push(`'${item.trim()}'`);
            }
        });

        // Join the formatted items with a comma and space
        return resultList.join(', ');
    }

    function formatList() {
        const inputItemList = document.getElementById('itemList').value;
        const formattedItemList = convertToList(inputItemList);
        const formattedListDiv = document.getElementById('formattedList');

        // Update the formatted list in the HTML
        formattedListDiv.textContent = formattedItemList;

        // Call the copy function to copy the formatted list
        copyText(formattedItemList);
    }

    function copyText(formattedList) {
        // Create a temporary text area element to copy the text
        var textArea = document.createElement('textarea');
        textArea.value = formattedList;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Optional: Alert or feedback to the user
        // alert("List copied to clipboard!");
    }
