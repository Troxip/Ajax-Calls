"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const renderCountry = function (country, data, className = "") {
  const currency = Object.values(data.currencies);
  console.log(currency);
  const language = Object.values(data.languages);
  console.log(language);
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}">
      <div class="country__data">
        <h3 class="country__name">${data.name.official}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          data.population / 1000000
        ).toFixed(1)} million<p>         
        <p class="country__row"><span>🗣️</span>${
          country === "tajikistan" ? language[1] : language[0]
        }</p>
        <p class="country__row"><span>💰</span>${currency[0].name}</p>
      </div>
  </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //Ajax call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render Country
    renderCountry(country, data);

    //Get neighbour country
    const neighbour = data.borders?.[0];
    console.log(neighbour);

    //Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(neighbour, data2, "neighbour");
    });
  });
};
getCountryAndNeighbour("usa");
