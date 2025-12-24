let currentDate = new Date();
let hyear = document.getElementById("hyear");
let hmonth = document.getElementById("hmonth");

let prevButton = document.getElementById("prevButton");
prevButton.addEventListener('click', prevClick());


let nextButton = document.getElementById("nextButton");
nextButton.addEventListener('click', nextClick());

let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let today = currentDate.getDate();

let monthName;
// switch to put the months name in 
switch(month) {
    case 0: 
        monthName = "January";
        break;
    case 1: 
        monthName = "February";
        break;
    case 2: 
        monthName = "March";
        break;
    case 3: 
        monthName = "April";
        break;
    case 4: 
        monthName = "May";
        break;
    case 5: 
        monthName = "June";
        break;
    case 6: 
        monthName = "July";
        break;
    case 7: 
        monthName = "August";
        break;
    case 8: 
        monthName = "September";
        break;
    case 9: 
        monthName = "October";
        break;
    case 10: 
        monthName = "November";
        break;
    case 11: 
        monthName = "December";
        break;
    default:
        monthName = "Invalid Month";
}


function init() {

    getNewQuote();

    // 0. set the header year and month
    hyear.innerText=year;
    hmonth.innerText = monthName; 

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

            if(i === today){
                element.style.color="darkorange"
                element.style.fontSize="larger"
            }
        }
    }
}

async function getNewQuote() {
    const response = await fetch('api.quotable.io');
    const data = await response.json();

    document.getElementById('quote-content').textContent = `"${data.content}"`;
    document.getElementById('quote-author').textContent = `- ${data.author}`;
}



function prevClick() {
    // 1. Decrease month
    month--; 
    
    // 2. If we go before January, move to December of previous year
    if (month < 0) {
        month = 11;
        year--;
    }
    
    updateAndRedraw();
}

function nextClick() {
    // 1. Increase month
    month++;
    
    // 2. If we go past December, move to January of next year
    if (month > 11) {
        month = 0;
        year++;
    }
    
    updateAndRedraw();
}

// Helper function to handle the refresh
function updateAndRedraw() {
    clearCalendar();
    updateMonthName(); // We need to update the monthName string
    init();
}

function clearCalendar() {
    // Loop through all possible 42 boxes and empty them
    for (let i = 1; i <= 42; i++) {
        let el = document.getElementById(i);
        if (el) {
            el.textContent = "";
            el.style.color = "";      // Reset color
            el.style.fontSize = "";   // Reset font size
        }
    }
}

function updateMonthName() {
    const date = new Date(year, month);
    // This uses the browser's built-in tool to get the name automatically!
    monthName = date.toLocaleString('default', { month: 'long' });
}

// Only highlight if the year/month matches the actual current date
let realToday = new Date();
if (i === realToday.getDate() && 
    month === realToday.getMonth() && 
    year === realToday.getFullYear()) {
    
    element.style.color = "darkorange";
    element.style.fontSize = "larger";
}














init();
// Call the function when the page loads

