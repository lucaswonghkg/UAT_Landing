/* Darkmode.js Settings */

const options = {
    bottom: "32px", // default: "32px"
    right: "32px", // default: "32px"
    left: "unset", // default: "unset"
    time: "0.3s", // default: "0.3s"
    mixColor: "#fff", // default: "#fff"
    backgroundColor: "#fff",  // default: "#fff"
    buttonColorDark: "#100f2c",  // default: "#100f2c"
    buttonColorLight: "#fff", // default: "#fff"
    saveInCookies: true, // default: true,
    label: "<i class='fas fa-lg fa-moon text-white'></i>", // default: ""
    autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();

const darkmodeButton = document.body.getElementsByTagName("button")[0];
const dateSettingsButton = document.getElementById("date-settings");

/* Date settings (UTC) */
let utcYear = 2020,
    utcMonth = 10,
    utcDay = 29,
    utcHour = 21,
    utcMinute = 0,
    utcSeconds = 0;

let countUpDate = new Date(utcYear, utcMonth - 1, utcDay, utcHour, utcMinute, utcSeconds);

/**
 * Converts a single digit number to a two digit string
 * @param {number} numberToConvert 
 */
const numberToTwoDigitsString = (numberToConvert = null) => {
    if (numberToConvert = null) {
        return;
    }
    if (numberToConvert <= 9 && numberToConvert >= 0) return "0" + numberToConvert;
    return "" + numberToConvert;
};

/**
 * Updates the date information on the page
 */
const updateDateInformation = () => {
    let dateNow = new Date();
    let timeNow = dateNow.getTime();
    let diffBetweenDates = timeNow - countUpDate.getTime();

    let dateDefinitions = [];
    dateDefinitions["years"] = Math.floor(diffBetweenDates / (1000 * 60 * 60 * 24 * 365));
    dateDefinitions["days"] = Math.floor(diffBetweenDates % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
    dateDefinitions["hours"] = Math.floor(diffBetweenDates % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    dateDefinitions["minutes"] = Math.floor(diffBetweenDates % (1000 * 60 * 60) / (1000 * 60));
    dateDefinitions["seconds"] = Math.floor(diffBetweenDates % (1000 * 60) / (1000));

    for (key in dateDefinitions) {
        const element = document.getElementById(key);
        element.querySelector("h1").innerText = dateDefinitions[key];
        element.querySelector("p").innerText = (dateDefinitions[key] == 1 ? key.replace(/.$/, "") : key);
    }
};

/**
 * Starts updateDateInformation periodically
 */
const count = setInterval(() => {
    updateDateInformation();
}, 1000);

updateDateInformation();

/** Changes the icon of the dark mode button */
const darkModeButtonChangeIcon = (element, classesToToggle) => {
    if (element == null || classesToToggle == null) {
        return;
    }
    classesToToggle.forEach(classToToggle => {
        element.classList.toggle(classToToggle);
    });
};


const darkmodeButtonClassList = ["text-warning", "text-white", "fa-moon", "fa-sun"];

/** Change icon if dark mode is already active */
if (document.body.classList.contains("darkmode--activated")) {
    darkModeButtonChangeIcon(darkmodeButton.children[0], darkmodeButtonClassList);
    darkModeButtonChangeIcon(dateSettingsButton, ["text-white"]);
}

/* Event listener for dark mode button */
darkmodeButton.addEventListener("click", () => {
    darkModeButtonChangeIcon(darkmodeButton.children[0], darkmodeButtonClassList);
    darkModeButtonChangeIcon(dateSettingsButton, ["text-white"]);
});