function convertToIpms(input) {
    const itemsArray = input.split(/[, \n]+/).filter(item => item.trim() !== '');
    let tableRows = '';
    const plainLines = [];
    itemsArray.forEach((item) => {
        const formattedItem = '0' + item.substring(2);
        tableRows += `<tr><td>${formattedItem}</td></tr>`;
        plainLines.push(formattedItem);
    });
    const itemCount = itemsArray.length;
    const plainText = plainLines.join('\n');
    return { tableRows, itemCount, plainText };
}
function formatIpms() {
    const inputIpmsList = document.getElementById('ipmsList').value;
    const { tableRows, itemCount, plainText } = convertToIpms(inputIpmsList);
    const formattedTableElement = document.getElementById('formattedIpms');
    const counterElement = document.getElementById('counter');
    formattedTableElement.innerHTML = tableRows;
    counterElement.textContent = `Total items: ${itemCount}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(plainText).catch(() => {});
    } else {
        const temp = document.createElement('textarea');
        temp.value = plainText;
        document.body.appendChild(temp);
        temp.select();
        try { document.execCommand("copy"); } catch (err) {}
        document.body.removeChild(temp);
    }
}
const textarea = document.getElementById("ipmsList");
textarea.addEventListener("focus", function() {
  textarea.value = "";
});
textarea.addEventListener("input", function () {
  this.value = this.value.replace(/\s+$/g, "");
});
