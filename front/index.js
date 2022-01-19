// $(() => {
//   $("#btnShowData").click(() => {
//     $.ajax({
//       url: "https://restcountries.com/v3.1/name/all",
//       success: function (data) {
//         data.map((el) => {
//           $("#countriesList").html(`<li>${el.name.common}</li>`);
//         });
//       },
//     });
//   });
// });

async function getCountries() {
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await res.json();
  console.log("data", data);
  return data;
}

async function startProgram() {
  const countries = await getCountries();
  //   console.log(countries);
  const countriesName = countries.map(function (country) {
    return `<li>
    <p>Country : ${country.flag}  ${country.name.common.toUpperCase()}</p>
    <p>Capital : ${country.capital}</p>
    <p>Population : ${country.population}</p>
    </li>`;
  });

  const list = document.querySelector("#countriesList");
  list.innerHTML = countriesName.join("");
}

const button = document.querySelector("#btnShowData");

button.addEventListener("click", () => {
  startProgram();
});
