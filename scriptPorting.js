function generateOutport(type) {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  let outputText = "";
  if (type === "CP") {
    outputText = "1 x Outport Fees to CP SOM xxxxxx\n" + day + "/" + month;
  } else if (type === "VF") {
    outputText = "1 x Outport Fees to VF SOM xxxxxx\n" + day + "/" + month;
  }

  // Same string on-page and to clipboard
  document.getElementById("output").textContent = outputText;
  copyToClipboard(outputText);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
