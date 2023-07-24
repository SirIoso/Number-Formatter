function convertToTable(input) {
    // Split the input based on spaces and commas
    const itemsArray = input.split(/[\s,]+/);

    // Create an empty string to store the formatted list
    let resultList = '';

    // Format each item and add it to the resultList
    itemsArray.forEach((item, index) => {
        resultList += `${item}\n`;
    });

    return resultList;
}

function formatTable() {
    const inputList = document.getElementById('numberList').value;
    const formattedList = convertToTable(inputList);
    const formattedTable = document.getElementById('formattedTable');

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
}
