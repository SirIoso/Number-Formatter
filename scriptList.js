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
}

function copyText() {
    // Get the formatted list element
    var formattedListDiv = document.getElementById("formattedList");

    // Create a range to select the div content
    var range = document.createRange();
    range.selectNode(formattedListDiv);

    // Select the range
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // Copy the selected text
    try {
        document.execCommand("copy");
        // alert("List copied to clipboard!");
    } catch (err) {
        alert("Unable to copy the list. Your browser may not support this feature.");
    }

    // Clear the selection
    window.getSelection().removeAllRanges();
}
