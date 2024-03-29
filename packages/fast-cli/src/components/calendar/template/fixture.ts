import { htmlTemplate } from "../../../cli.template.js";

export default htmlTemplate`<style>
    ${c => c.componentPrefix}-${c => c.tagName} {
        width: 304px;
        font-family: "Segoe UI", sans-serif;
        padding: 20px;
    }

    .long-days {
        width: 800px;
    }

    .events {
        --cell-height: 80px;
        width: 1000px;
    }

    /*
        Custom ${c => c.className}, blue and orange theme with borders
    */
    .borders {
        width: 700px;
        --cell-height: 100px;
        --cell-border: 1px solid #666;
        --current-day-color: orange;
        --current-day-border: 1px solid;
        text-align: center;
    }

    .borders::part(week-day) {
        background: #024;
    }

    .borders::part(week) {
        grid-gap: 0;
        margin-top: 0;
    }

    .borders::part(day) {
        background: #222;
        transition: all 0.5s linear;
        text-align: left;
        border-radius: 0;
        --inactive-day-color: #666;
    }

    .borders::part(day):hover {
        background: #000;
        cursor: pointer;
    }

    .borders::part(today) {
        background: transparent;
        color: orange;
        width: auto;
    }

    .borders::part(title) {
        color: orange;
    }

    /*
        Custom calendar with circle backgrounds for the days
    */
    .borders2 {
        width: 420px;
        --cell-height: 60px;
    }

    .borders2::part(title) {
        font-size: 70px;
        letter-spacing: -8px;
        text-align: right;
        margin: 0 10px -20px 0;
        color: #222;
    }

    .borders2::part(week-day) {
        color: purple;
        font-size: 2em;
    }

    .borders2::part(week) {
        grid-gap: 0;
        margin-top: 0;
    }

    .borders2::part(day) {
        background: none;
        --inactive-day-color: #666;
    }

    .borders2::part(date),
    .borders2::part(today) {
        text-align: center;
        width: 46px;
        height: 46px;
        line-height: 50px;
        text-align: center;
        background: #333;
        border-radius: 50%;
        cursor: pointer;
    }

    .borders2::part(today) {
        background: purple;
        margin: auto;
        color: #fff;
    }

    .borders2::part(date):hover,
    .borders2::part(today):hover {
        background: #fff;
        color: purple;
    }

    .borders3 {
        width: 600px;
        --cell-border: 1px dashed #666;
        --cell-height: 60px;
        --current-day-color: #0f0;
    }

    .border3::part(week-days) {
        border: 0;
    }

    .borders3::part(week-day) {
        background: #080;
        border: 0;
    }

    .borders3::part(week) {
        grid-gap: 0;
        margin-top: 0;
    }

    .borders3::part(day) {
        background: none;
        border-radius: 0;
        height: auto;
        --inactive-day-color: #666;
    }

    .borders3::part(date),
    .borders3::part(today) {
        padding: 0;
        text-align: left;
    }

    .borders3::part(week):hover {
        background: rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .borders3::part(day):hover {
        background: #080;
        color: #0f0;
    }

    .borders3::part(today) {
        background: transparent;
        color: #0f0;
    }

    .borders4 {
        width: 560px;
        --cell-height: 60px;
        --current-day-color: #fff;
        color: aqua;
        position: relative;
    }

    .borders4::part(month) {
        color: yellow;
    }

    .borders4::part(week-days) {
        border-bottom: 1px solid #ff2a6a;
    }

    .borders4::part(week-day) {
        color: #ff2a6a;
    }

    .borders4::part(week) {
        position: relative;
        grid-gap: 0;
        margin-top: 0;
    }

    .borders4::part(day) {
        background: none;
    }

    .borders4::part(date),
    .borders4::part(today) {
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        cursor: pointer;
    }

    .borders4::part(today) {
        background: aqua;
        border-radius: 50%;
        color: black;
    }

    .borders4::part(week):hover::before {
        content: "";
        display: block;
        position: absolute;
        height: 1px;
        background: red;
        left: 10px;
        right: 10px;
        margin: 23px 0 0;
    }

    .borders4::part(day):hover::before,
    .borders4::part(today):hover::before {
        content: "";
        display: block;
        position: absolute;
        top: -27px;
        width: 1px;
        height: 100px;
        background: red;
        margin: 0 0 0 35px;
    }

    .borders4::part(day):hover::after,
    .borders4::part(today):hover::after {
        content: "";
        display: block;
        position: absolute;
        width: 35px;
        height: 35px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        border: 1px solid red;
        margin: -19px 0 0 36px;
    }

    .light-borders {
        --cell-border: 1px solid #333;
    }

    .light-borders::part(week-day) {
        background: #333;
    }

    .compact {
        width: 164px;
        text-align: center;
        font-size: 12px;
    }

    .compact::part(title) {
        font-size: 16px;
    }

    .compact::part(day),
    .compact::part(week-day) {
        height: 20px;
        padding: 0;
        line-height: 20px;
    }

    .compact::part(date),
    .compact::part(today) {
        padding: 0;
    }

    #click-output {
        background: #fff;
        width: 400px;
        height: 20px;
        padding: 10px;
        font-family: Arial;
        transition: none;
    }

    #click-output.loaded {
        background: #a33;
        transition: all ease-out 1s;
    }

    #click::part(day):hover,
    #click::part(today):hover {
        background: #333;
    }

    .calendar-change {
        position: relative;
        margin: 20px 40px;
    }

    .calendar-change #previous,
    .calendar-change #next {
        position: absolute;
        left: 0;
        top: 10px;
        transform: translateX(-50%);
        border: 0;
        background: 0;
    }

    .calendar-change #next {
        right: 0;
        left: auto;
        transform: translateX(50%);
    }

    #year {
        max-width: 1300px;
    }

    #year ${c => c.componentPrefix}-${c => c.tagName} {
        --inactive-day-color: transparent;
        display: inline-block;
        color: #aaa;
    }

    #year ${c => c.componentPrefix}-${c => c.tagName}::part(week-day) {
        color: #fff;
    }

    #year ${c => c.componentPrefix}-${c => c.tagName}::part(title) {
        color: #fff;
    }
</style>
<h1>${c => c.className}</h1>

<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>

<h2>${c => c.className} with readonly</h2>
<${c => c.componentPrefix}-${c => c.tagName} readonly="true"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>${c => c.className} for April 2020</h2>
<${c => c.componentPrefix}-${c => c.tagName} month="4" year="2020"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Expanded weekday labels</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="long-days" weekday-format="long"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Shortened month and weekday labels</h2>
<${c => c.componentPrefix}-${c => c.tagName}
class="compact"
month="12"
month-format="short"
weekday-format="narrow"
></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Styling for borders, font colors and background colors</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="borders"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} class="borders2" weekday-format="narrow"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} class="borders3" weekday-format="narrow"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}
class="borders4"
weekday-format="narrow"
day-format="2-digit"
></${c => c.componentPrefix}-${c => c.tagName}>

<h2>${c => c.className} with events</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="events light-borders" month="1" year="2021">
    <div slot="1-1-2021">New Year's Day</div>
    <div slot="1-1-2021">Hangover Day</div>
    <div slot="1-5-2021">National Bird Day</div>
    <div slot="1-10-2021">Houseplant Appreciation Day</div>
    <div slot="1-13-2021">National Take the Stairs Day</div>
    <div slot="1-18-2021">Martin Luther King Jr. Birthday</div>
    <div slot="1-26-2021">Spouse's Day</div>
</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Disabled dates</h2>
<${c => c.componentPrefix}-${c => c.tagName}
month="12"
year="2021"
disabled-dates="12-2-2021,12-3-2021,12-4-2021,12-10-2021,12-11-2021,12-14-2021,12-15-2021,12-16-2021,12-17-2021,12-19-2021,12-22-2021,12-28-2021,12-29-2021,12-30-2021"
></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Selected dates</h2>
<${c => c.componentPrefix}-${c => c.tagName}
month="12"
year="2021"
selected-dates="12-2-2021,12-3-2021,12-4-2021,12-10-2021,12-11-2021,12-14-2021,12-15-2021,12-16-2021,12-17-2021,12-19-2021,12-22-2021,12-28-2021,12-29-2021,12-30-2021"
></${c => c.componentPrefix}-${c => c.tagName}>

<h2>${c => c.className} with click handler</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="events light-borders" id="click" month="1" year="2021">
    <div slot="1-13-2021">Another test slot</div>
    <div slot="1-4-2021">Test slot</div>
    <div slot="1-29-2021">Test slot</div>
    <div slot="1-29-2021">Second slot</div>
</${c => c.componentPrefix}-${c => c.tagName}>
<div class="click-out">
    <h3>Selected:</h3>
    <div id="click-output"></div>
</div>
<script>
if (!window.calendarSelect) {
    let calendarSelect = document.getElementById("click");

    const dateSelect = evt => {
        const { day, month, year } = evt.detail;
        const dateString = \`\${month}-\${day}-\${year}\`;
        if (calendarSelect.dateInString(dateString, calendarSelect.selectedDates)) {
            calendarSelect.selectedDates = calendarSelect.selectedDates.replace(
                new RegExp(",?" + dateString),
                ""
            );
        } else {
            calendarSelect.selectedDates +=
                (calendarSelect.selectedDates === "" ? "" : ",") + dateString;
        }
        const output = document.getElementById("click-output");
        output.className = "";
        output.innerHTML = "";
        output.innerHTML = \`\${month}-\${day}-\${year} was selected\`;
        setTimeout(() => (output.className = "loaded"), 1);
    };
    calendarSelect.addEventListener("dateselected", dateSelect);
}
</script>

<h2>Changing ${c => c.className}</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="light-borders calendar-change" min-weeks="6">
<button id="previous" class="calendar-control" tabindex="-1">
    <fast-flipper
        id="previous-flipper"
        slot="end"
        direction="previous"
        aria-hidden="false"
    ></fast-flipper>
</button>
<button id="next" class="calendar-control" tabindex="-1">
    <fast-flipper id="next-flipper" slot="end" aria-hidden="false"></fast-flipper>
</button>
</${c => c.componentPrefix}-${c => c.tagName}>

<script>
if (!window.changeCalendar) {
    const bindScript = (id, script) => {
        document.getElementById(id).addEventListener("click", script);
    };
    const changeCalendar = (direction, event) => {
        const calendar = event.path.find(
            node =>
                !!node.tagName && node.tagName.toLowerCase().indexOf("calendar") >= 0
        );
        const { month, year } = calendar;
        const nextMonth = month + direction;
        calendar.year = year + (nextMonth > 12 ? 1 : nextMonth < 1 ? -1 : 0);
        calendar.month = nextMonth < 1 ? 12 : nextMonth > 12 ? 1 : nextMonth;
    };
    bindScript("previous", changeCalendar.bind(this, -1));
    bindScript("next", changeCalendar.bind(this, 1));
}
</script>

<h2>German ${c => c.className}</h2>
<${c => c.componentPrefix}-${c => c.tagName}
class="long-days"
weekday-format="long"
locale="de-DE"
style="text-align: center;"
></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Thai Buddhist ${c => c.className}</h2>
<${c => c.componentPrefix}-${c => c.tagName}
locale="th-TH-u-ca-buddhist-nu-thai"
style="text-align: center;"
></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Arabic ${c => c.className}</h2>
<${c => c.componentPrefix}-${c => c.tagName}
style="direction: rtl; text-align: center;"
class="events"
locale="ar-XE-u-ca-islamic-nu-arab"
month="1"
year="2021"
>
<div slot="1-1-2021">January 1</div>
<div slot="1-2-2021">January 2</div>
</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Year ${c => c.className} view</h2>
<div id="year"></div>
<script>
(year => {
    const container = document.getElementById("year");
    const addMonth = (_, index) => {
        const monthCalendar = document.createElement("${c => c.componentPrefix}-${c => c.tagName}");
        monthCalendar.className = "compact";
        monthCalendar.readonly = true;
        monthCalendar.weekdayFormat = "narrow";
        monthCalendar.minWeeks = 6;
        monthCalendar.month = index + 1;
        if (year) monthCalendar.year = year;
        container.appendChild(monthCalendar);
    };
    new Array(12).fill(null).forEach(addMonth);
})();
</script>`;