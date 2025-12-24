let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();

let hyear = document.getElementById("hyear");
let hmonth = document.getElementById("hmonth");

// FIX 1: Remove the () from the function names here
let prevButton = document.getElementById("prevButton");
prevButton.addEventListener('click', prevClick); 

let nextButton = document.getElementById("nextButton");
nextButton.addEventListener('click', nextClick);

function init() {
    getNewQuote();
    updateMonthName();

    hyear.innerText = year;
    hmonth.innerText = monthName; 

    const totalDays = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    let startBox = ((firstDay + 6) % 7) + 1;

    // Real current date for highlighting
    let realToday = new Date();

    for (let i = 1; i <= totalDays; i++) {
        let boxId = i + (startBox - 1);
        let element = document.getElementById(boxId);
        
        if (element) {
            element.textContent = i;

            // FIX 2: Check for "today" inside the loop where 'i' and 'element' exist
            if (i === realToday.getDate() && 
                month === realToday.getMonth() && 
                year === realToday.getFullYear()) {
                
                element.style.color = "darkorange";
                element.style.fontSize = "larger";
                element.style.fontWeight = "bold";
            }
        }
    }
}

async function getNewQuote() {
    try {
        // FIX 3: Added https://
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        document.getElementById('quote-content').textContent = `"${data.content}"`;
        document.getElementById('quote-author').textContent = `- ${data.author}`;
    } catch (error) {
        console.log("Quote failed to load");
    }
}

function prevClick() {
    month--; 
    if (month < 0) {
        month = 11;
        year--;
    }
    updateAndRedraw();
}

function nextClick() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    updateAndRedraw();
}

function updateAndRedraw() {
    clearCalendar();
    init();
}

function clearCalendar() {
    for (let i = 1; i <= 35; i++) { // You have 35 IDs in your HTML
        let el = document.getElementById(i);
        if (el) {
            el.textContent = "";
            el.style.color = ""; 
            el.style.fontSize = "";
        }
    }
}

function updateMonthName() {
    const tempDate = new Date(year, month);
    monthName = tempDate.toLocaleString('default', { month: 'long' });
}

// Start the calendar
init();