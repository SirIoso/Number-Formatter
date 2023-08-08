function convertToPort(input) {
    // Split the input based on either a comma or a space
    const itemsArray = input.split(/[, \n]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Remove leading and trailing whitespaces
        const trimmedItem = item.trim();
        // Separate the first two characters from the rest with a space
        const formattedItem = trimmedItem.slice(0, 2) + ' ' + trimmedItem.slice(2);
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
