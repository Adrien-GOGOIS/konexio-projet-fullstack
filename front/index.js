// FONCTION DE CHARGEMENT DE LA PAGE

function loading() {
  document.querySelector(
    "#countriesList"
  ).innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
}

// On récupère la liste des pays
async function getCountries() {
  loading();
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
// ***************** //

// On écoute le click du bouton qui va lancer le programme
const button = document.querySelector("#btnShowData");
const form = document.querySelector("#form");
const reset = document.querySelector("#btnReset");

// RESET
reset.addEventListener("click", () => {
  startProgram();
});

// Bouton recherche par pays/capitale
form.addEventListener("submit", (event) => {
  event.preventDefault();
  startSearchProgram();
});

// Fonction de recherche du pays par entrée utilisateur
async function getUserCountries() {
  // On récupère le check radio
  const selected = document.querySelector('input[name="search"]:checked').value;
  const userInput = document.querySelector("input").value;

  // GUARD pour passer à la sélection par continent si radio 'continent' selectionnée
  if (selected === "continent") {
    startContinentProgram();
    return;
  }

  // Recherche à 2 adresses différentes selon la radio sélectionnée et le pays/capitale entrés dans l'input
  let res1;

  if (selected === "country") {
    res1 = await fetch(`https://restcountries.com/v3.1/name/${userInput}`);
  } else if (selected === "capital") {
    res1 = await fetch(`https://restcountries.com/v3.1/capital/${userInput}`);

    // Recherche par continent
  }
  const data1 = await res1.json();
  return data1;
}

// Fonction de recherche par entrée utilisateur
async function startSearchProgram() {
  // On récupère le résultat de getUserCountries()...
  const country1 = await getUserCountries();

  // .. Et on l'affiche dans le HTML
  const list1 = document.querySelector("#countriesList");
  list1.innerHTML = `<li>
  <p>Country : ${country1[0].flag}  ${country1[0].name.common.toUpperCase()}</p>
  <p>Capital : ${country1[0].capital}</p>
  <p>Population : ${country1[0].population}</p>
  </li>`;

  // ******** LEAFLET ********* //

  var map = L.map("map").setView(
    [country1[0].latlng[0], country1[0].latlng[1]],
    6
  );

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiY2FuYWRhc2VjIiwiYSI6ImNreW16bGw1NTE1cnkyb3Vmajlzbmc5aXAifQ.5WbzFfz5_VFTGQoMthfRwA",
    }
  ).addTo(map);
}

// **************** //
// RECHERCHE PAR MENU DEROULANT CONTINENT //
// **************** //

// Fonction recherche par continent

async function getContinent() {
  const continent = document.getElementsByName("continents")[0].value;
  const res2 = await fetch(
    `https://restcountries.com/v3.1/region/${continent}`
  );
  const data2 = await res2.json();

  return data2;
}

async function startContinentProgram() {
  const continentCountries = await getContinent();

  const continentCountriesName = continentCountries.map(function (country1) {
    return `<li>
    <p>Country : ${country1.flag}  ${country1.name.common.toUpperCase()}</p>
    <p>Capital : ${country1.capital}</p>
    <p>Population : ${country1.population}</p>
    </li>`;
  });

  const list2 = document.querySelector("#countriesList");
  list2.innerHTML = continentCountriesName.join("");
}
