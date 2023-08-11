const ageCalculate = () => {
    const today = new Date();
    const inputDate = new Date(document.getElementById("date-input").value);

    const birthDate= {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear(),

    };

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if(isFutureDate(birthDate, currentYear, currentMonth, currentDate)) {
        alert("Not Born Yet");
        displayResult("_", "_", "_");
        return;

    }
    const { years, months, days } = calculateAge(
        birthDate,
        currentYear,
        currentMonth,
        currentDate

);

displayResult(days, months, years);
 };

 const isFutureDate = (
    birthDate,
    currentYear,
    currentMonth,
    currentDate
 ) => {
    return(
        birthDate.year > currentYear ||
        (birthDate.year === currentYear &&
           ( birthDate.month > currentMonth ||
            (birthDate.month === currentMonth &&
                birthDate.date > currentDate)))

            

    );
 };

 const calculateAge = (birthDate , currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDate.year;
    let months, days;

    if ( currentMonth < birthDate.month) {
        years--;
        months = 12 - (birthDate.month - currentMonth);

    } else {
        months = currentMonth - birthDate.month;
    }

    if(currentDate < birthDate.date) {
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth ( lastMonth, currentYear);
        days = daysInLastMonth - (birthDate.date - currentDate);

    } else {
        days = currentDate -birthDate.date;
    }

    return { years, months, days };
 };

 const getDaysInMonth = (month, year) => {
    const isLeapYear = year/4 === 0 && (year / 100 != 0 || year / 400 === 0);

    const getDaysInMonth = [31, isLeapYear ? 29: 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return getDaysInMonth[month - 1];
 };

 const displayResult = (bDate, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
 }

document.getElementById("calculate-age-btn").addEventListener("click", ageCalculate);
