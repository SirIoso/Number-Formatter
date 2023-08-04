function convertToDevoli(input) {
    // Split the input based on either a comma or a space
    const itemsArray = input.split(/[, ]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Replace the first '0' with '64'
        const formattedItem = item.replace(/^0/, '64');
        // Add a new row to the table with the formatted item as the content of the cell
        tableRows += `<tr><td>${formattedItem}</td></tr>`;
    });

    // Update the item count
    const itemCount = itemsArray.length;

    return { tableRows, itemCount };
}

function formatDevoli() {
    const inputDevoliList = document.getElementById('devoliList').value;
    const { tableRows, itemCount } = convertToDevoli(inputDevoliList);
    const formattedTableElement = document.getElementById('formattedDevoli');
    const counterElement = document.getElementById('counter');

    // Update the formatted table in the HTML
    formattedTableElement.innerHTML = tableRows;

    // Update the item count in the HTML
    counterElement.textContent = `Total items: ${itemCount}`;
}
