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

// Demarrage programme affichage des pays au chargement de la page
startProgram();

// ***************** //
// RECHERCHE PAR CAPITALE OU PAYS

// On écoute le click du bouton qui va lancer le programme
const button = document.querySelector("#btnShowData");

button.addEventListener("click", () => {
  startSearchProgram();
});

async function getCountriesByName() {
  const userInput = document.querySelector("input").value;
  const res = await fetch(`https://restcountries.com/v3.1/${userInput}`);
  const data = await res.json();

  return data;
}

async function getCountriesByCapital() {
  const userInput = document.querySelector("input").value;
  const res = await fetch(
    `https://restcountries.com/v3.1/capital/${userInput}`
  );
  const data = await res.json();

  return data;
}

async function startSearchProgram() {
  const country = await getCountriesByName();

  const list = document.querySelector("#countriesList");
  list.innerHTML = `<li>
      <p>Country : ${country.flag}  ${country.name.common.toUpperCase()}</p>
      <p>Capital : ${country.capital}</p>
      <p>Population : ${country.population}</p>
      </li>`;

    const capital = await getCountriesByCapital();
  };

  
}
