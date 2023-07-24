function convertToList(input) {
    // Split the input based on spaces and commas
    const itemsArray = input.split(/[\s,]+/);

    // Create an empty string to store the formatted list
    let resultList = '';

    // Loop through the itemsArray and format each item
    itemsArray.forEach((item, index) => {
        // Add the item to the resultList with the desired format
        resultList += `'${item}',\n`;
    });

    return resultList;
}

function formatList() {
    const inputList = document.getElementById('numberList').value;
    const formattedList = convertToList(inputList);
    // const formattedTable = document.getElementById('formattedTable');
    const formattedListDiv = document.getElementById('formattedList');

    // Clear existing table rows
    formattedTable.innerHTML = '';

    // Split the formattedList into an array of lines
    const lines = formattedList.trim().split('\n');

    // Create a new row for each line and add it to the table
    lines.forEach((line) => {
        const newRow = formattedTable.insertRow();
        const newCell = newRow.insertCell();
        newCell.textContent = line;
    });

    // Update the formatted list in the HTML
    formattedListDiv.textContent = formattedList;
}
