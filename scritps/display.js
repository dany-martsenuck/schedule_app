// Sample data for testing (replace this with actual data retrieval logic)
const scheduleData = [
    ["Ілюшин Микита Денисович", "Чат", "CC300600IMD", "380961212408", "ilushinikita4@gmail.com", "1", "9830", "CC150802MDE", "07:00-19:00", "07:00-19:00", "Вихідний", "Вихідний", "09:00-21:00", "09:00-19:00", "Вихідний", "Вихідний", "20:30-08:30", "20:30-08:30", "Вихідний", "08:00-20:00", "08:00-20:00", "Перенесення", "Вихідний", "Вихідний", "14:00-02:00", "14:00-02:00", "Вихідний", "Вихідний", "20:30-08:30", "20:30-08:30", "Вихідний", "Вихідний", "08:00-20:00", "08:00-20:00", "Вихідний", "Вихідний", "14:00-02:00", "14:00-02:00", "Вихідний", "88:00:00", "176:00:00", "44:00:00", "0:00"]
];

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
    createTableRows(scheduleData);
    applyCellColors();
};
