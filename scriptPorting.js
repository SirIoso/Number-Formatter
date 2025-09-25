function convertToPort(input, addSip, port, cp, tnas) {
  // Split the input based on comma or newline ONLY
  const itemsArray = input.split(/[\n,]+/);

  // Clean up blanks
  const cleanedItems = itemsArray
    .map((item) => item.trim().replace(/\s+/g, " ")) // collapse multiple spaces to one
    .filter((item) => item.length > 0); // remove empty entries

  let tableRows = "";

  cleanedItems.forEach((item) => {
    const trimmedItem = item.trim();

    // Replace numbers starting with 61 or 64 with 0
    const replacedItem =
      trimmedItem.startsWith("61") || trimmedItem.startsWith("64")
        ? "0" + trimmedItem.slice(2)
        : trimmedItem;

    // Separate formatting
    const formattedItem = tnas
      ? replacedItem.slice(0, 4) + " " + replacedItem.slice(4)
      : replacedItem.slice(0, 2) + " " + replacedItem.slice(2);

    tableRows += `<tr><td>${formattedItem}</td></tr>`;
  });

  const itemCount = cleanedItems.length;

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
