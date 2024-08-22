const editor = document.getElementById("editor");
const htmlEditor = document.getElementById("htmlEditor");
const fontNameSelect = document.getElementById("fontName");
const fontSizeSelect = document.getElementById("fontSize");
const fontWeightSelect = document.getElementById("fontWeight");
const lineHeightSelect = document.getElementById("lineHeight");
const letterSpacingSelect = document.getElementById("letterSpacing");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
const fontColorInput = document.getElementById("fontColor");
const bgColorInput = document.getElementById("bgColor");
const alignLeftButton = document.getElementById("alignLeft");
const alignCenterButton = document.getElementById("alignCenter");
const alignRightButton = document.getElementById("alignRight");
const justifyButton = document.getElementById("justify");
const insertOrderedListButton = document.getElementById("insertOrderedList");
const insertUnorderedListButton = document.getElementById("insertUnorderedList");
const toggleHtmlButton = document.getElementById("toggleHtml");
const insertImageButton = document.getElementById("insertImage");
const createLinkButton = document.getElementById("createLink");
const imageUploadInput = document.getElementById("imageUpload");
const dropArea = document.getElementById("dropArea");
const insertTableButton = document.getElementById("insertTable");
const addRowButton = document.getElementById("addRow");
const addColumnButton = document.getElementById("addColumn");
const deleteRowButton = document.getElementById("deleteRow");
const deleteColumnButton = document.getElementById("deleteColumn");

fontNameSelect.addEventListener("change", () => {
  document.execCommand("fontName", false, fontNameSelect.value);
});

fontSizeSelect.addEventListener("change", () => {
  changeFontSize(fontSizeSelect.value);
});

fontWeightSelect.addEventListener("change", () => {
  applyStyleToSelection("fontWeight", fontWeightSelect.value);
});

lineHeightSelect.addEventListener("change", () => {
  applyStyleToSelection("lineHeight", lineHeightSelect.value);
});

letterSpacingSelect.addEventListener("change", () => {
  applyStyleToSelection("letterSpacing", letterSpacingSelect.value + "px");
});

boldButton.addEventListener("click", () => {
  document.execCommand("bold", false);
});

italicButton.addEventListener("click", () => {
  document.execCommand("italic", false);
});

underlineButton.addEventListener("click", () => {
  document.execCommand("underline", false);
});

fontColorInput.addEventListener("input", function () {
  document.execCommand("foreColor", false, this.value);
});

bgColorInput.addEventListener("input", function () {
  document.execCommand("hiliteColor", false, this.value);
});

alignLeftButton.addEventListener("click", () => {
  document.execCommand("justifyLeft", false);
});

alignCenterButton.addEventListener("click", () => {
  document.execCommand("justifyCenter", false);
});

alignRightButton.addEventListener("click", () => {
  document.execCommand("justifyRight", false);
});

justifyButton.addEventListener("click", () => {
  document.execCommand("justifyFull", false);
});

insertOrderedListButton.addEventListener("click", () => {
  document.execCommand("insertOrderedList", false);
});

insertUnorderedListButton.addEventListener("click", () => {
  document.execCommand("insertUnorderedList", false);
});

toggleHtmlButton.addEventListener("click", () => {
  if (editor.style.display !== "none") {
    htmlEditor.value = editor.innerHTML;
    editor.style.display = "none";
    htmlEditor.style.display = "block";
  } else {
    editor.innerHTML = htmlEditor.value;
    editor.style.display = "block";
    htmlEditor.style.display = "none";
  }
});

insertImageButton.addEventListener("click", () => {
  imageUploadInput.click();
});

imageUploadInput.addEventListener("change", () => {
  const files = imageUploadInput.files;
  handleFiles(files);
});

createLinkButton.addEventListener("click", () => {
  const url = prompt("Enter the URL:");
  if (url) {
    document.execCommand("createLink", false, url);
  }
});

insertTableButton.addEventListener("click", () => {
  const rows = prompt("Enter number of rows:", "2");
  const cols = prompt("Enter number of columns:", "2");
  if (rows && cols) {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    for (let i = 0; i < rows; i++) {
      let row = table.insertRow();
      for (let j = 0; j < cols; j++) {
        let cell = row.insertCell();
        cell.innerHTML = "&nbsp;";
        cell.style.border = "1px solid #000";
        cell.style.padding = "8px";
      }
    }
    editor.focus();
    document.execCommand("insertHTML", false, table.outerHTML);
  }
});

addRowButton.addEventListener("click", () => {
  const table = getSelectedTable();
  if (table) {
    const newRow = table.insertRow();
    for (let i = 0; i < table.rows[0].cells.length; i++) {
      const cell = newRow.insertCell();
      cell.innerHTML = "&nbsp;";
      cell.style.border = "1px solid #000";
      cell.style.padding = "8px";
    }
  }
});

addColumnButton.addEventListener("click", () => {
  const table = getSelectedTable();
  if (table) {
    for (let i = 0; i < table.rows.length; i++) {
      const cell = table.rows[i].insertCell();
      cell.innerHTML = "&nbsp;";
      cell.style.border = "1px solid #000";
      cell.style.padding = "8px";
    }
  }
});

deleteRowButton.addEventListener("click", () => {
  const table = getSelectedTable();
  if (table) {
    const row = window.getSelection().anchorNode.parentNode.parentNode;
    if (row && row.rowIndex !== -1) {
      table.deleteRow(row.rowIndex);
    }
  }
});

deleteColumnButton.addEventListener("click", () => {
  const table = getSelectedTable();
  if (table) {
    const cellIndex = window.getSelection().anchorNode.parentNode.cellIndex;
    if (cellIndex !== -1) {
      for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(cellIndex);
      }
    }
  }
});

document.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.display = 'block';
    }
);

document.addEventListener('dragleave', (event) => {
  if (event.clientX === 0 && event.clientY === 0) {
    // Drag left the window
    dropArea.style.display = 'none';
    }
});




dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dropArea.style.display = 'none';
  const files = event.dataTransfer.files;
  handleFiles(files);
});

dropArea.addEventListener('click', () => {
  imageUploadInput.click();
});

function handleFiles(files) {
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%';
        editor.focus();
        document.execCommand('insertHTML', false, img.outerHTML);
      };
      reader.readAsDataURL(file);
    }
  }
}

function applyStyleToSelection(styleName, value) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const selectedContents = range.extractContents();
    const span = document.createElement("span");

    // Check if the selected contents are already wrapped in a span
    if (selectedContents.childNodes.length === 1 && selectedContents.firstChild.nodeName === "SPAN") {
      const existingSpan = selectedContents.firstChild;
      existingSpan.style[styleName] = value;
      range.insertNode(existingSpan);
    } else {
      span.style[styleName] = value;
      span.appendChild(selectedContents);
      range.insertNode(span);
    }

    // Clear the selection
    selection.removeAllRanges();
  }
}

function changeFontSize(size) {
  document.execCommand("fontSize", false, "7");
  const fontElements = editor.getElementsByTagName("font");
  for (let i = 0; i < fontElements.length; i++) {
    if (fontElements[i].size === "7") {
      fontElements[i].removeAttribute("size");
      fontElements[i].style.fontSize = size + "px";
    }
  }
}

function getSelectedTable() {
  let node = window.getSelection().anchorNode;
  while (node) {
    if (node.tagName === "TABLE") {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}


