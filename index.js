let currentDate = new Date();

function init() {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    // 1. Get total days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // 2. Get the weekday of the 1st day (JS standard: 0-6)
    let firstDay = new Date(year, month, 1).getDay();

    // 3. Convert JS day to YOUR day (Monday=1, Sunday=7)
    let startBox = ((firstDay + 6) % 7) + 1;

    // 4. Fill the boxes
    for (let i = 1; i <= totalDays; i++) {
        // Calculation: Start at the 'startBox' and move forward
        // If the month starts on Monday (1), Day 1 goes in Box 1.
        // If the month starts on Tuesday (2), Day 1 goes in Box 2.
        let boxId = i + (startBox - 1);
        
        let element = document.getElementById(boxId);
        if (element) {
            element.textContent = i;
        }
    }
}

init();