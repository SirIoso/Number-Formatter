function convertToIpms(input) {
    // Split the input based on either a comma or a space
    const itemsArray = input.split(/[, \n]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Remove the first two characters and replace them with '0'
        const formattedItem = '0' + item.substring(2);
        // Add a new row to the table with the formatted item as the content of the cell
        tableRows += `<tr><td>${formattedItem}</td></tr>`;
    });

    // Update the item count
    const itemCount = itemsArray.length;

    return { tableRows, itemCount };
}

function formatIpms() {
    const inputIpmsList = document.getElementById('ipmsList').value;
    const { tableRows, itemCount } = convertToIpms(inputIpmsList);
    const formattedTableElement = document.getElementById('formattedIpms');
    const counterElement = document.getElementById('counter');

    // Update the formatted table in the HTML
    formattedTableElement.innerHTML = tableRows;

    // Update the item count in the HTML
    counterElement.textContent = `Total items: ${itemCount}`;
}

function copyText() {
    // Get the formatted list element
    var formattedIpmsDiv = document.getElementById("formattedIpms");

    // Create a range to select the div content
    var range = document.createRange();
    range.selectNode(formattedIpmsDiv);

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