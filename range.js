function convertToPort(input) {
    // Split the input based on either a comma or a space
    const itemsArray = input.split(/[, ]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Check if the item contains a range of numbers (e.g., 987262 - 987265)
        if (item.includes('-')) {
            const rangeParts = item.split('-');
            if (rangeParts.length === 2) {
                const startNum = parseInt(rangeParts[0]);
                const endNum = parseInt(rangeParts[1]);
                // Add all numbers in the range to the tableRows
                for (let num = startNum; num <= endNum; num++) {
                    // Format the number and add it to the tableRows
                    const formattedItem = formatNumber(num);
                    tableRows += `<tr><td>${formattedItem}</td></tr>`;
                }
            }
        } else {
            // Remove leading and trailing whitespaces
            const trimmedItem = item.trim();
            // Format the number and add it to the tableRows
            const formattedItem = formatNumber(trimmedItem);
            tableRows += `<tr><td>${formattedItem}</td></tr>`;
        }
    });

    return tableRows;
}

function formatNumber(num) {
    // If num is a string, convert it to an integer
    const number = typeof num === 'string' ? parseInt(num) : num;
    // Separate the first two characters from the rest with a space
    return number.toString().slice(0, 2) + ' ' + number.toString().slice(2);
}

function formatPort() {
    const inputPortList = document.getElementById('portList').value;
    const tableRows = convertToPort(inputPortList);
    const formattedTableElement = document.getElementById('formattedPort');
    const counterElement = document.getElementById('counter');

    // Update the formatted table in the HTML
    formattedTableElement.innerHTML = tableRows;

    // Update the line count in the HTML
    const lineCount = tableRows.split('<tr>').length - 1;
    counterElement.textContent = `Total lines: ${lineCount}`;
}
