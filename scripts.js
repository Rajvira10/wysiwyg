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

document.addEventListener("DOMContentLoaded", function () {
  let savedSelection;

  function saveSelection() {
    const selection = window.getSelection();
    savedSelection = selection.getRangeAt(0).cloneRange();
    console.log(savedSelection.toString());
  }

  const editor = document.getElementById("editor");
    editor.addEventListener("keyup", function () {
    saveSelection();
    }
    );

  function restoreSelection() {
    const selection = window.getSelection();
    selection.removeAllRanges();
    if (savedSelection) {
      selection.addRange(savedSelection);
    }
  }

  function applyColorToSelection(styleProperty, color) {
    document.execCommand(styleProperty === "color" ? "foreColor" : "hiliteColor", false, color);
  }

  const fontColorCells = document.querySelectorAll("#fontColorPicker .color-cell");
  fontColorCells.forEach(cell => {
    cell.addEventListener("mousedown", function (event) {
      event.preventDefault();
      restoreSelection();
      applyColorToSelection("color", event.target.style.backgroundColor);
      saveSelection();
    });
  });

  const bgColorCells = document.querySelectorAll("#bgColorPicker .color-cell");
  bgColorCells.forEach(cell => {
    cell.addEventListener("mousedown", function (event) {
      event.preventDefault();
      restoreSelection();
      applyColorToSelection("backgroundColor", event.target.style.backgroundColor);
      saveSelection();
    });
  });

  // More Colors functionality for font color
  const moreFontColorsLink = document.getElementById("moreFontColorsLink");
  const moreFontColorsInput = document.getElementById("moreFontColors");
  const fontColorPicker = document.getElementById("fontColorPicker");

  moreFontColorsLink.addEventListener("mousedown", function (event) {
    event.preventDefault();
    event.stopPropagation();
    fontColorPicker.classList.add("active");
    setTimeout(() => {
      saveSelection();
      moreFontColorsInput.click();
    }, 0);
  });

  moreFontColorsInput.addEventListener("input", function () {
    restoreSelection();
    applyColorToSelection("color", this.value);
    saveSelection();
  });

  moreFontColorsInput.addEventListener("change", function () {
    fontColorPicker.classList.remove("active");
  });

  // More Colors functionality for background color
  const moreBgColorsLink = document.getElementById("moreBgColorsLink");
  const moreBgColorsInput = document.getElementById("moreBgColors");
  const bgColorPicker = document.getElementById("bgColorPicker");

  moreBgColorsLink.addEventListener("mousedown", function (event) {
    event.preventDefault();
    event.stopPropagation();
    bgColorPicker.classList.add("active");
    setTimeout(() => {
      saveSelection();
      moreBgColorsInput.click();
    }, 0);
  });

  moreBgColorsInput.addEventListener("input", function () {
    restoreSelection();
    applyColorToSelection("backgroundColor", this.value);
    saveSelection();
  });

  moreBgColorsInput.addEventListener("change", function () {
    bgColorPicker.classList.remove("active");
  });

  // Prevent color pickers from closing when clicking inside them
  fontColorPicker.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  bgColorPicker.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Close color pickers when clicking outside
  document.addEventListener("click", function () {
    fontColorPicker.classList.remove("active");
    bgColorPicker.classList.remove("active");
  });
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

editor.addEventListener("keydown", function (event) {
if (event.key === "Tab") {
    event.preventDefault();
    document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
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

const generateLoremIpsumButton = document.getElementById("generateLoremIpsum");

const loremIpsumParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit.",
    "Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
    "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.",
];

generateLoremIpsumButton.addEventListener("click", () => {
    const numberOfParagraphs = prompt("Enter number of paragraphs:", "1");
    if (numberOfParagraphs) {
        const paragraphsToInsert = [];
        for (let i = 0; i < Math.min(numberOfParagraphs, loremIpsumParagraphs.length); i++) {
            paragraphsToInsert.push(loremIpsumParagraphs[i % loremIpsumParagraphs.length]);
        }
        const loremIpsumText = paragraphsToInsert.join("\n\n");

        editor.focus();
        document.execCommand("insertHTML", false, `<p>${loremIpsumText.replace(/\n\n/g, '</p><p>')}</p>`);
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const editor = document.getElementById("editor");
  const charCount = document.getElementById("charCount");
  const lineCount = document.getElementById("lineCount");
  const wordCount = document.getElementById("wordCount");

  let history = [];
  let historyIndex = -1;

  function saveState() {
    history = history.slice(0, historyIndex + 1);
    history.push(editor.innerHTML);
    historyIndex++;
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      editor.innerHTML = history[historyIndex];
      updateCharCount();
      updateLineCount();
      updateWordCount();
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      editor.innerHTML = history[historyIndex];
      updateCharCount();
      updateLineCount();
      updateWordCount();
    }
  }

  function updateCharCount() {
    const text = editor.innerText || editor.textContent;
    // Trim the last newline character to avoid counting it as a visible character
    const trimmedText = text.endsWith('\n') ? text.slice(0, -1) : text;
    charCount.textContent = `Characters: ${trimmedText.length}`;
  }

  function updateLineCount() {
    const text = editor.innerText || editor.textContent;
    const lines = text.split(/\n/).filter(line => line.trim().length > 0);
    lineCount.textContent = `Lines: ${lines.length}`;
  }

  function updateWordCount() {
    const text = editor.innerText || editor.textContent;
    const words = text.split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = `Words: ${words.length}`;
  }

  editor.addEventListener("input", function () {
    saveState();
    updateCharCount();
    updateLineCount();
    updateWordCount();
  });

  document.getElementById("undoButton").addEventListener("click", undo);
  document.getElementById("redoButton").addEventListener("click", redo);

  // Save the initial state
  saveState();
  updateCharCount();
  updateLineCount();
  updateWordCount();
});

