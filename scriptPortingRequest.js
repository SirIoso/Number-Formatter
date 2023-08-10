function convertToPort(input) {
    const itemsArray = input.split('\n');
    let tableRows = '';

    itemsArray.forEach((item) => {
        const trimmedItem = item.trim();

        // Replace em dashes (U+2013) and en dashes (U+2014) with hyphens (U+002D)
        const sanitizedItem = trimmedItem.replace(/[\u2013\u2014]/g, '-');

        if (sanitizedItem.includes(':')) {
            const parts = sanitizedItem.split(':');
            if (parts.length === 2) {
                const number = parts[1].replace(/\s/g, ''); // Remove spaces
                tableRows += `<tr><td>${number}</td></tr>`;
            }
        }
    });

    return tableRows;
}

function formatPort() {
    const inputPortList = document.getElementById('portList').value;
    const tableRows = convertToPort(inputPortList);
    const formattedTableElement = document.getElementById('formattedPort');
    const counterElement = document.getElementById('counter');

    formattedTableElement.innerHTML = tableRows;

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