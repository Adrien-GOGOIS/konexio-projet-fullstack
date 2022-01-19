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

async function getUserCountries() {
  const selected = document.querySelector(
    "input[type=radio][name=contact]:checked"
  ).value;

  const userInput = document.querySelector("input").value;

  let res1;

  if (selected === "country") {
    res1 = await fetch(`https://restcountries.com/v3.1/name/${userInput}`);
  } else if (selected === "capital") {
    res1 = await fetch(`https://restcountries.com/v3.1/capital/${userInput}`);
  }
  const data1 = await res1.json();
  return data1;
}

async function startSearchProgram() {
  const country1 = await getUserCountries();

  const list1 = document.querySelector("#countriesList");
  list1.innerHTML = `<li>
  <p>Country : ${country1[0].flag}  ${country1[0].name.common.toUpperCase()}</p>
  <p>Capital : ${country1[0].capital}</p>
  <p>Population : ${country1[0].population}</p>
  </li>`;
}
