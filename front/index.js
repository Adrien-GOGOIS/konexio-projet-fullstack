// On récupère la liste des pays
async function getCountries() {
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await res.json();

  return data;
}

// On attend d'avoir récupérer la liste des pays pour les insérer dans une liste en HTML
async function startProgram() {
  const countries = await getCountries();

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

// On écoute le click du bouton qui va lancer le programme
const button = document.querySelector("#btnShowData");

button.addEventListener("click", () => {
  startProgram();
});
