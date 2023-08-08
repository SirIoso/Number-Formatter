function convertToPort(input) {
    // Split the input based on either a comma or a space or new line?
    const itemsArray = input.split(/[, \n]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Determine the maximum length of numbers in the input
    const maxLength = getMaxNumberLength(itemsArray);

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Remove leading and trailing whitespaces
        const trimmedItem = item.trim();
        // Check if the item contains a range of numbers (e.g., 987262 - 987265)
        if (trimmedItem.includes('-')) {
            const rangeParts = trimmedItem.split('-');
            if (rangeParts.length === 2) {
                const startNum = parseInt(rangeParts[0], 10); // Parse as base 10
                const endNum = parseInt(rangeParts[1], 10); // Parse as base 10
                // Add all numbers in the range to the tableRows
                for (let num = startNum; num <= endNum; num++) {
                    // Format the number, remove leading zero, and add it to the tableRows
                    tableRows += `<tr><td>${formatNumber(num, maxLength)}</td></tr>`;
                }
            }
        } else {
            // Remove leading zero if present
            const trimmedWithoutLeadingZero = trimmedItem.replace(/^0+/, '');
            // Format the number, add a zero, and add it to the tableRows
            tableRows += `<tr><td>${formatNumber('0' + trimmedWithoutLeadingZero, maxLength)}</td></tr>`;
        }
    });

    return tableRows;
}


function getMaxNumberLength(itemsArray) {
    let maxLength = 0;
    itemsArray.forEach((item) => {
        if (item.includes('-')) {
            const rangeParts = item.split('-');
            if (rangeParts.length === 2) {
                const startNum = parseInt(rangeParts[0], 10); // Parse as base 10
                const endNum = parseInt(rangeParts[1], 10); // Parse as base 10
                const rangeMaxLength = Math.max(startNum.toString().length, endNum.toString().length);
                maxLength = Math.max(maxLength, rangeMaxLength);
            }
        } else {
            const trimmedItem = item.trim();
            maxLength = Math.max(maxLength, trimmedItem.length);
        }
    });
    return maxLength;
}

function formatNumber(num, maxLength) {
    // Convert the number to a string and pad with zeros to the determined maxLength
    return num.toString().padStart(maxLength, '0');
}

function formatPort() {
    const inputPortList = document.getElementById('portList').value;
    const tableRows = convertToPort(inputPortList);
    const formattedTableElement = document.getElementById('formattedPort');
    const counterElement = document.getElementById('counter');

    // Set the contentEditable property to true for the table
    formattedTableElement.contentEditable = true;

    // Update the formatted table in the HTML
    formattedTableElement.innerHTML = tableRows;

    // Update the line count in the HTML
    const lineCount = tableRows.split('<tr>').length - 1;
    counterElement.textContent = `Total lines: ${lineCount}`;
}

function copyText() {
    // Get the table element
    var tableElement = document.getElementById("formattedPort");

    // Create a range to select the table content
    var range = document.createRange();
    range.selectNode(tableElement);

    // Select the range
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // Copy the selected text
    try {
        document.execCommand("copy");
        alert("Table copied to clipboard!");
    } catch (err) {
        alert("Unable to copy the table. Your browser may not support this feature.");
    }

    // Clear the selection
    window.getSelection().removeAllRanges();
}
