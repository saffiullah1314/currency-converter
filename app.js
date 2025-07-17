let selects = document.querySelectorAll("select");
let enterAmt = document.querySelector(".amount input");
let convertedAmt = document.querySelector(".converted-amount");
let iconBtn = document.querySelector(".icon");
let btn = document.querySelector("button");
let indicater = document.querySelector(".indicater p");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
const base_url = "https://v6.exchangerate-api.com/v6/9dbc0d70cea0aa95a831fa61/pair/";

// Function to swap the values of 'from' and 'to' when icon is clicked
iconBtn.addEventListener("click", () => {
    // Swap the selected currency codes
    let temp = from.value;
    from.value = to.value;
    to.value = temp;

    // Update the flag images after swap
    updateFlag(from.value, from);
    updateFlag(to.value, to);
});

// Populate select elements with options from countryList
for (let select of selects) {
    for (let code in countryList) {
        let newOp = document.createElement("option");
        newOp.innerText = code;
        newOp.value = code;
        select.append(newOp);
    }

    // Add event listener to update the flag image when the select changes
    select.addEventListener("change", (e) => {
        let selectedCrr = e.target.value;
        updateFlag(selectedCrr, select); // Pass the select element to updateFlag
    });
}

btn.addEventListener("click", getExchange);

// Function to update the flag image based on the selected currency
const updateFlag = (selectedCrr, select) => {
    let container = select.closest(".select-container"); // Get the closest select-container
    let img = container.querySelector(".flag-circle img"); // Get the image inside this container
    let newSrc = `https://flagcdn.com/w320/${countryList[selectedCrr].toLowerCase()}.png`;
    img.src = newSrc; // Update the image inside the specific container
};

const callingApi = async (fromVal, toVal) => {
    const url = `${base_url}${fromVal}/${toVal}`;
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.conversion_rate;
    updateRate(rate, fromVal, toVal);
}

const updateRate = (rate, fromVal, toVal) => {
    let convertedRate = rate * enterAmt.value;
    convertedAmt.innerText = convertedRate.toFixed(3);
    indicater.innerText = `${enterAmt.value} ${fromVal} = ${convertedRate.toFixed(3)} ${toVal}`;
}

function getExchange() {
    let inputValue = parseFloat(enterAmt.value);
    if (isNaN(inputValue) || inputValue < 1) {
        inputValue = 1;
        enterAmt.value = inputValue;
    }
    const fromVal = from.value;
    const toVal = to.value;
    callingApi(fromVal, toVal);
}

// Call getExchange once when the page loads
window.addEventListener("load", getExchange);
