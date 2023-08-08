function convertToPort(input) {
    // Split the input based on either a comma or a space
    const itemsArray = input.split(/[, \n]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Remove leading and trailing whitespaces
        const trimmedItem = item.trim();

        // Replace numbers starting with 61 or 64 with 0
        const replacedItem = trimmedItem.startsWith('61') || trimmedItem.startsWith('64')
            ? '0' + trimmedItem.slice(2)
            : trimmedItem;

        // Separate the first two characters from the rest with a space
        const formattedItem = replacedItem.slice(0, 2) + ' ' + replacedItem.slice(2);

        // Add a new row to the table with the formatted item as the content of the cell
        tableRows += `<tr><td>${formattedItem}</td></tr>`;
    });

    // Update the item count
    const itemCount = itemsArray.length;

    return { tableRows, itemCount };
}

function formatPort() {
    const inputPortList = document.getElementById('portList').value;
    const { tableRows, itemCount } = convertToPort(inputPortList);
    const formattedTableElement = document.getElementById('formattedPort');
    const counterElement = document.getElementById('counter');

    // Update the formatted table in the HTML
    formattedTableElement.innerHTML = tableRows;

    // Update the item count in the HTML
    counterElement.textContent = `Total items: ${itemCount}`;
}

function copyText() {
    // Get the formatted list element
    var formattedPortDiv = document.getElementById("formattedPort");

    // Create a range to select the div content
    var range = document.createRange();
    range.selectNode(formattedPortDiv);

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