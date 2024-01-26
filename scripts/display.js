// Function to read the schedule file and populate the table
function readScheduleFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result;
        const scheduleData = parseCSV(contents); // Implement CSV parsing logic
        createTableHeader();
        createTableRows(scheduleData);
        applyCellColors();
    };

    reader.readAsText(file);
}

// Sample function to parse CSV data (replace with actual parsing logic)
function parseCSV(data) {
    const rows = data.split('\n');
    const scheduleData = [];

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(',');
        scheduleData.push(cells);
    }

    return scheduleData;
}


// Function to create table header
function createTableHeader() {
    const headerRow = document.createElement("tr");
    const headers = ["Full Name", "Type", "LDAP", "Phone Number", "Email", "Level", "Job Number"];
    headers.forEach(headerText => {
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

// Sample function to apply cell colors based on preferences (replace with actual logic)
function applyCellColors() {
    // Dummy logic, replace with actual color logic
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

// Sample function to sort table by column index (replace with actual sorting logic)
function sortTable(columnIndex) {
    const table = document.getElementById("scheduleTable");
    const rows = Array.from(table.rows).slice(1); // Exclude header row
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();
        return cellA.localeCompare(cellB);
    });
    table.innerHTML = "";
    createTableHeader();
    createTableRows(rows.map(row => Array.from(row.cells).map(cell => cell.textContent)));
    applyCellColors(); // Reapply colors after sorting
}

// Execute functions when the page loads
window.onload = function () {
    createTableHeader();
    // Read the schedule file when the page loads
    const scheduleFileInput = document.getElementById('scheduleFileInput');
    scheduleFileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            readScheduleFile(file);
        }
    });
    applyCellColors();
};
