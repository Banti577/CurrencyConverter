//const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("#convert-btn");
let fromCurrency = document.querySelector("#from-currency");
let toCurrency = document.querySelector("#to-currency");
let convertedAmount = document.querySelector("#converted-amount");

console.log(dropdowns);

for (let select of dropdowns) {
  //console.log(select)

  for (let country in countryList) {
    let option = document.createElement("option");

    option.innerText = countryList[country];
    option.value = country;

    if (select.name === "from" && country === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && country === "INR") {
      option.selected = "selected";
    }

    select.append(option);
  }

  select.addEventListener("change", (event) => {
    // console.log(event)
    handleImage(event.target);
  });
}

const handleImage = (element) => {
  console.log(element);
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];

  let newSourceLink = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSourceLink;
  //console.log(img)
};

button.addEventListener("click", async (e) => {
  e.preventDefault();

  let amount = document.querySelector("#amount");
  let amountValue = amount.value;
  //console.log(amountValue)

  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  //console.log(fromCurrency.value.toLowerCase(), toCurrency.value.toLowerCase());

  //let URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
  let URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;

  console.log(URL);
  let response = await fetch(URL);

  //console.log(response)
  let data = await response.json();
  console.log(data);

  let conversionRate =
    data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  console.log(conversionRate);
  if (!conversionRate) {
    console.log(`Converted Amount: ${convertedAmount}`);
  }

  let result = amountValue * conversionRate;

  convertedAmount.innerHTML = `Converted Amount:-- ${result}`;
});
