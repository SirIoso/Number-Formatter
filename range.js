function convertToPort(input) {
    // Split the input based on either a comma, space, or new line
    const itemsArray = input.split(/[, \n]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // Remove leading and trailing whitespaces
        const trimmedItem = item.trim();

        // Skip processing if the item contains only zeros or spaces
        if (/^[0\s]+$/.test(trimmedItem)) {
            return;
        }

        // Check if the item contains a range of numbers (e.g., 987262 - 987265)
        if (trimmedItem.includes('-')) {
            const rangeParts = trimmedItem.split('-');
            if (rangeParts.length === 2) {
                const startNum = parseInt(rangeParts[0], 10); // Parse as base 10
                const endNum = parseInt(rangeParts[1], 10); // Parse as base 10

                // Add all numbers in the range to the tableRows
                for (let num = startNum; num <= endNum; num++) {
                    // Format the number and add it to the tableRows
                    tableRows += `<tr><td>${formatNumberWithLeadingZero(num)}</td></tr>`;
                }
            }
        } else {
            // Add a leading zero if the number doesn't start with zero
            const formattedItem = trimmedItem.startsWith('0')
                ? trimmedItem
                : '0' + trimmedItem;

            // Format the number and add it to the tableRows
            tableRows += `<tr><td>${formatNumberWithLeadingZero(formattedItem)}</td></tr>`;
        }
    });

    return tableRows;
}

function formatNumberWithLeadingZero(num) {
    // Add a leading zero if the number doesn't start with zero
    return num.toString().startsWith('0') ? num : '0' + num;
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
        // alert("Table copied to clipboard!");
    } catch (err) {
        alert("Unable to copy the table. Your browser may not support this feature.");
    }

    // Clear the selection
    window.getSelection().removeAllRanges();
}

const textarea = document.getElementById("portList");

textarea.addEventListener("focus", function() {
  textarea.value = ""; // Clear the textarea content
});

// Strip trailing spaces from textarea input
textarea.addEventListener("input", function () {
  this.value = this.value.replace(/\s+$/g, "");
});
