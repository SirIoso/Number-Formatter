function convertToPort(input, addSip, port, cp, tnas, noOutport, teams) {
  // Split on commas, newlines, or spaces, drop empties, strip internal spaces, remove duplicates
  const itemsArray = [...new Set(
    input
      .split(/[,\n\s]+/)
      .map((item) => item.replace(/\s+/g, ""))
      .filter((item) => item !== "")
  )];

  let lines = [];

  itemsArray.forEach((item) => {
    // Remove leading and trailing whitespaces
    const trimmedItem = item.trim();

    // Replace numbers starting with 61 or 64 with 0
    const replacedItem =
      trimmedItem.startsWith("61") || trimmedItem.startsWith("64")
        ? "0" + trimmedItem.slice(2)
        : trimmedItem;

    // Separate characters with a space
    if (tnas) {
      lines.push(replacedItem.slice(0, 4) + " " + replacedItem.slice(4));
    } else {
      lines.push(replacedItem.slice(0, 2) + " " + replacedItem.slice(2));
    }
  });

  // Update the item count
  const itemCount = itemsArray.length;

  // Work out title
  let sipLine = addSip ? "Sipline and " : "";

  let title;
  if (teams) {
    title = `${itemCount} x DDI (Teams)`;
  } else if (port) {
    title = `${itemCount} x ${sipLine}DDI`;
  } else if (tnas) {
    title = `${itemCount} x TNAS Devoli Toll Free`;
  } else if (noOutport) {
    title = `${itemCount} x DDI`;
  } else {
    title = `${itemCount} x Cease billing`;
  }

  // Init date
  const date = new Date();

  // Work out porting fee
  let fee;
  if (teams) {
    fee = `${itemCount} x Porting Fee`;
  } else if (noOutport) {
    fee = "No Porting Fee";
  } else if (port || tnas) {
    fee = `${itemCount} x Porting Fee`;
  } else if (addSip && cp) {
    fee = `${itemCount} x Outport Fees to CP SOM xxxxxx`;
  } else if (addSip && !cp) {
    fee = `${itemCount} x Outport Fees to VF SOM xxxxxx`;
  } else {
    fee = "No Outport Fee";
  }

  const dateStr =
    date.getDate() + "/" + String(date.getMonth() + 1).padStart(2, "0");

  // Assemble plain-text output
  const outputText =
    title + "\n\n" +
    lines.join("\n") +
    "\n\n" + fee +
    "\n" + dateStr;

  return { outputText, itemCount };
}

function formatPort(addSip, port = false, cp = false, tnas = false, noOutport = false, teams = false) {
  const inputPortList = document.getElementById("portList").value;
  const { outputText, itemCount } = convertToPort(
    inputPortList,
    addSip,
    port,
    cp,
    tnas,
    noOutport,
    teams
  );

  const formattedPortDiv = document.getElementById("formattedPort");
  const counterElement = document.getElementById("counter");

  // Update the plain-text output in the HTML
  formattedPortDiv.textContent = outputText;

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

const textarea = document.getElementById("portList");

textarea.addEventListener("focus", function () {
  textarea.value = ""; // Clear the textarea content
});
