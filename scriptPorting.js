function convertToPort(input, addSip, port, cp, tnas) {
  // Split the input based on either a comma or a space
  const itemsArray = input.split(/[, \n]+/);

  // Create an empty string to store the formatted table
  let tableRows = "";

  itemsArray.forEach((item) => {
    // Remove leading and trailing whitespaces
    const trimmedItem = item.trim();

    // Replace numbers starting with 61 or 64 with 0
    const replacedItem =
      trimmedItem.startsWith("61") || trimmedItem.startsWith("64")
        ? "0" + trimmedItem.slice(2)
        : trimmedItem;

    // Separate the first two characters from the rest with a space
    if (tnas) {
      const formattedItem =
        replacedItem.slice(0, 4) + " " + replacedItem.slice(4);
      tableRows += `<tr><td>${formattedItem}</td></tr>`;
    } else {
      const formattedItem =
        replacedItem.slice(0, 2) + " " + replacedItem.slice(2);
      tableRows += `<tr><td>${formattedItem}</td></tr>`;
    }
  });

  // Update the item count
  const itemCount = itemsArray.length;

  // Work out title
  let sipLine = addSip ? "Sipline and " : "";

  let title;
  if (port) {
    title = `${itemCount} x ${sipLine}DDI`;
  } else if (tnas) {
    title = `${itemCount} x TNAS Devoli Toll Free`;
  } else {
    title = `${itemCount} x Cease billing`;
  }

  // Add title
  tableRows = `<tr><td>${title}</td></tr><tr><td>&nbsp;</td></tr>` + tableRows;

  // Init date
  const date = new Date();

  // Add porting fee & date
  let fee;
  if (port || tnas) {
    fee = `${itemCount} x Porting Fee`;
  } else if (addSip && cp) {
    fee = `${itemCount} x Outport Fees to CP SOM xxxxxx`;
  } else if (addSip && !cp) {
    fee = `${itemCount} x Outport Fees to VF SOM xxxxxx`;
  } else {
    fee = "No Outport Fee";
  }

  tableRows += `<tr><td>&nbsp;</td></tr><tr><td>${fee}<td></tr>`;
  tableRows +=
    "<tr><td>" +
    date.getDate() +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "</td></tr>";

  return { tableRows, itemCount };
}

function formatPort(addSip, port = false, cp = false, tnas = false) {
  const inputPortList = document.getElementById("portList").value;
  console.log(addSip, port, cp, tnas);
  const { tableRows, itemCount } = convertToPort(
    inputPortList,
    addSip,
    port,
    cp,
    tnas
  );
  const formattedTableElement = document.getElementById("formattedPort");
  const counterElement = document.getElementById("counter");

  // Update the formatted table in the HTML
  formattedTableElement.innerHTML = tableRows;

  // Update the item count in the HTML
  counterElement.textContent = `Total items: ${itemCount}`;

  // Get the formatted list element
  var formattedPortDiv = document.getElementById("formattedPort");

  // Create a range to select the div content
  var range = document.createRange();
  range.selectNode(formattedPortDiv);

  // Select the range
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  // Copy the selected text
  try {
    document.execCommand("copy");
    //alert("List copied to clipboard!");
  } catch (err) {
    alert(
      "Unable to copy the list. Your browser may not support this feature."
    );
  }

  // Clear the selection
  window.getSelection().removeAllRanges();
}

const textarea = document.getElementById("portList");

textarea.addEventListener("focus", function () {
  textarea.value = ""; // Clear the textarea content
});
