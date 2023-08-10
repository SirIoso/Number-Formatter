function convertToDevoli(input) {
    // Split the input based on either a comma or a space
    const itemsArray = input.split(/[, \n]+/);

    // Create an empty string to store the formatted table
    let tableRows = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item) => {
        // If the item starts with '0', keep it as is; otherwise, add '64'
        const formattedItem = item.startsWith('0') ? item.replace(/^0/, '64') : '64' + item;

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

function copyText() {
    // Get the formatted list element
    var formattedDevoliDiv = document.getElementById("formattedDevoli");

    // Create a range to select the div content
    var range = document.createRange();
    range.selectNode(formattedDevoliDiv);

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
