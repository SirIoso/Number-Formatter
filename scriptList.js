function convertToList(input) {
    // Split the input based on spaces and commas
    const itemsArray = input.split(/[\s,]+/);

    // Create an empty string to store the formatted list
    let resultList = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item, index) => {
        // Add the item to the resultList with the desired format
        resultList += `'${item}', `;
    });

    return resultList;
}

function formatList() {
    const inputItemList = document.getElementById('itemList').value;
    const formattedItemList = convertToList(inputItemList);
    const formattedListDiv = document.getElementById('formattedList');

    // Update the formatted list in the HTML
    formattedListDiv.textContent = formattedItemList;
}
