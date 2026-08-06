function convertToPort(input) {
    // Split on commas, spaces, or newlines, and drop empties
    const itemsArray = input
        .split(/[, \n]+/)
        .filter((item) => item !== "");

    // Collect each formatted number as a line
    let lines = [];

    itemsArray.forEach((item) => {
        // Remove leading and trailing whitespaces
        const trimmedItem = item.trim();

        // Skip processing if the item contains only zeros or spaces
        if (/^[0\s]+$/.test(trimmedItem)) {
            return;
        }

        // Check if the item contains a range of numbers (e.g., 987262-987265)
        if (trimmedItem.includes('-')) {
            const rangeParts = trimmedItem.split('-');
            if (rangeParts.length === 2) {
                const startNum = parseInt(rangeParts[0], 10); // Parse as base 10
                const endNum = parseInt(rangeParts[1], 10); // Parse as base 10

                // Add all numbers in the range
                for (let num = startNum; num <= endNum; num++) {
                    lines.push(formatNumberWithLeadingZero(num));
                }
            }
        } else {
            // Add a leading zero if the number doesn't start with zero
            const formattedItem = trimmedItem.startsWith('0')
                ? trimmedItem
                : '0' + trimmedItem;

            lines.push(formatNumberWithLeadingZero(formattedItem));
        }
    });

    const outputText = lines.join("\n");
    const lineCount = lines.length;
    return { outputText, lineCount };
}

function formatNumberWithLeadingZero(num) {
    // Add a leading zero if the number doesn't start with zero
    return num.toString().startsWith('0') ? num : '0' + num;
}

function formatPort() {
    const inputPortList = document.getElementById('portList').value;
    const { outputText, lineCount } = convertToPort(inputPortList);
    const formattedPortDiv = document.getElementById('formattedPort');
    const counterElement = document.getElementById('counter');

    // Update the plain-text output in the HTML
    formattedPortDiv.textContent = outputText;

    // Update the line count in the HTML
    counterElement.textContent = `Total lines: ${lineCount}`;

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

const textarea = document.getElementById("portList");

textarea.addEventListener("focus", function() {
  textarea.value = ""; // Clear the textarea content
});

// Strip trailing spaces from textarea input
textarea.addEventListener("input", function () {
  this.value = this.value.replace(/\s+$/g, "");
});
