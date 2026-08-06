function convertToDevoli(input) {
    // Split on commas, spaces, or newlines, and drop empties
    const itemsArray = input
        .split(/[, \n]+/)
        .filter((item) => item !== "");

    let lines = [];
    itemsArray.forEach((item) => {
        // If the item starts with '0', replace with '64'; otherwise prepend '64'
        const formattedItem = item.startsWith('0') ? item.replace(/^0/, '64') : '64' + item;
        lines.push(formattedItem);
    });

    const itemCount = itemsArray.length;
    const outputText = lines.join("\n");
    return { outputText, itemCount };
}

function formatDevoli() {
    const inputDevoliList = document.getElementById('devoliList').value;
    const { outputText, itemCount } = convertToDevoli(inputDevoliList);
    const formattedDevoliDiv = document.getElementById('formattedDevoli');
    const counterElement = document.getElementById('counter');

    // Update the plain-text output in the HTML
    formattedDevoliDiv.textContent = outputText;

    // Update the item count in the HTML
    counterElement.textContent = `Total items: ${itemCount}`;

    // Copy the raw string to the clipboard as PLAIN TEXT (no HTML)
    copyPlainText(outputText);
}

function copyPlainText(text) {
    // Preferred: Clipboard API writes a raw string, guaranteed plain text
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    // Fallback for older browsers: copy from a hidden textarea (still plain text)
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    try {
        document.execCommand("copy");
    } catch (err) {
        alert("Unable to copy the list. Your browser may not support this feature.");
    }
    document.body.removeChild(temp);
}

const textarea = document.getElementById("devoliList");
textarea.addEventListener("focus", function() {
  textarea.value = ""; // Clear the textarea content
});
// Strip trailing spaces from textarea input
textarea.addEventListener("input", function () {
  this.value = this.value.replace(/\s+$/g, "");
});
