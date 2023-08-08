function convertToTable(input) {
    // Split the input based on either a comma or a space
    const itemsArray = input.split(/[, \n]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Remove leading and trailing whitespaces
        const trimmedItem = item.trim();
        // Add a new row to the table with the item as the content of the cell
        tableRows += `<tr><td>${trimmedItem}</td></tr>`;
    });

    return tableRows;
}

function formatTable() {
    const inputItemList = document.getElementById('itemList').value;
    const formattedTable = convertToTable(inputItemList);
    const formattedTableElement = document.getElementById('formattedTable');

    // Update the formatted table in the HTML
    formattedTableElement.innerHTML = formattedTable;
}

function copyText() {
    // Get the formatted list element
    var formattedListDiv = document.getElementById("formattedTable");

    // Create a range to select the div content
    var range = document.createRange();
    range.selectNode(formattedListDiv);

    // Select the range
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // Copy the selected text
    try {
        document.execCommand("copy");
        alert("List copied to clipboard!");
    } catch (err) {
        alert("Unable to copy the list. Your browser may not support this feature.");
    }

    // Clear the selection
    window.getSelection().removeAllRanges();
}
