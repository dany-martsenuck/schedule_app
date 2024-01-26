// Function to read the schedule file and populate the table
function readScheduleFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result;
        const scheduleData = parseCSV(contents);
        createTableHeader(scheduleData[0]); // Pass the column names to createTableHeader
        createTableRows(scheduleData.slice(1)); // Exclude the header row from data
        applyCellColors();
    };

    reader.readAsText(file);
}

// Function to parse CSV data
function parseCSV(data) {
    const rows = data.split('\n');
    const scheduleData = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].split(',');
        scheduleData.push(cells);
    }

    return scheduleData;
}

// Function to create table header
function createTableHeader(columnNames) {
    const headerRow = document.createElement("tr");
    columnNames.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    document.getElementById("scheduleTable").appendChild(headerRow);
}

// Function to create table rows
function createTableRows(data) {
    data.forEach(rowData => {
        const row = document.createElement("tr");
        rowData.forEach(cellData => {
            const cell = document.createElement("td");
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        document.getElementById("scheduleTable").appendChild(row);
    });
}

// Function to apply cell colors based on preferences
function applyCellColors() {
    const colorPreferences = {
        "Вихідний": "green",
        "07:00-19:00": "yellow",
        "09:00-21:00": "pink"
    };

    const scheduleCells = document.querySelectorAll("#scheduleTable td");
    scheduleCells.forEach(cell => {
        const cellValue = cell.textContent.trim();
        if (colorPreferences[cellValue]) {
            cell.style.backgroundColor = colorPreferences[cellValue];
        }
    });
}

// Function to sort table by column index
function sortTable(columnIndex) {
    const table = document.getElementById("scheduleTable");
    const rows = Array.from(table.rows).slice(1);
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();
        return cellA.localeCompare(cellB);
    });
    table.innerHTML = "";
    createTableHeader(columnNames);
    createTableRows(rows.map(row => Array.from(row.cells).map(cell => cell.textContent)));
    applyCellColors();
}

// Execute functions when the page loads
window.onload = function () {
    const scheduleFileInput = document.getElementById('scheduleFileInput');
    scheduleFileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            readScheduleFile(file);
        }
    });
    applyCellColors();
};
