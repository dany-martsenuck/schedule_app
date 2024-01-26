function applyColors() {
    const fileInput = document.getElementById('fileInput');
    const weekendColor = document.getElementById('weekendColor').value;
    const morningShiftColor = document.getElementById('morningShiftColor').value;
    const eveningShiftColor = document.getElementById('eveningShiftColor').value;

    // Fetch the schedule file and process it (replace this with actual file processing logic)
    alert(`File: ${fileInput.files[0].name}\nWeekend Color: ${weekendColor}\nMorning Shift Color: ${morningShiftColor}\nEvening Shift Color: ${eveningShiftColor}`);
}
