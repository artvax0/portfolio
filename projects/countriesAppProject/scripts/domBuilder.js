import { countries, search, reset } from "./countries.js";
import { getFavourites, saveFavourites } from "./storage.js";

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => { // event type can also be 'keydown'
    reset();
    cards.innerHTML = '';
    search(searchInput.value.trim());
    createCardList();
});

const cards = document.getElementById('cards');

export const createCard = (country, isFavourite = false) => {
    const card = document.createElement('div');
    card.className = 'card shadow-lg m-2 col-md-3 col-sm-12';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top border-rounded';
    cardImg.src = country.flags.png;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerText = country.name.common;

    const capitals = document.createElement('p');
    capitals.className = 'card-text';
    capitals.innerHTML = `<strong>Capitals:</strong> ${country.capital ? country.capital.map(capital => capital).join(', ') : 'None'}`;

    const population = document.createElement('p');
    population.className = 'card-text';
    population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;

    const independence = document.createElement('p');
    independence.className = 'card-text';
    independence.innerHTML = `<strong>Independent:</strong> ${country.independent ? 'True' : 'False'}`;

    const unMember = document.createElement('p');
    unMember.className = 'card-text';
    unMember.innerHTML = `<strong>UN Member:</strong> ${country.unMember ? 'True' : 'False'}`;

    const languages = document.createElement('p');
    languages.className = 'card-text';
    languages.innerHTML = `<strong>Langauges:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'None'}`;

    const currencies = document.createElement('p');
    currencies.className = 'card-text';
    currencies.innerHTML = `<strong>Currencies:</strong> ${country.currencies ? Object.keys(country.currencies).join(', ') : 'None'}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer mb-2 d-flex justify-content-center';

    const heart = document.createElement('i');
    heart.className = `bi bi-heart${isFavourite ? '-fill' : ''}`;
    heart.addEventListener('click', () => {
        heart.classList.toggle('bi-heart-fill');
        heart.classList.toggle('bi-heart');
        if (isFavourite == false) {
            isFavourite = true;
            addFavourite(country);
        } else {
            isFavourite = false;
            removeFavourite(country);
        }
    })

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(capitals);
    cardBody.appendChild(population);
    cardBody.appendChild(languages);
    cardBody.appendChild(currencies);
    cardBody.appendChild(independence);
    cardBody.appendChild(unMember);
    cardFooter.appendChild(heart);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cards.append(card);
}

const addFavourite = (country) => {
        const favourites = getFavourites();
        favourites.push(country);
        saveFavourites(favourites);
        createCardList();
}

const removeFavourite = (country) => {
    let favourites = getFavourites();
    // remove favourite country from the country by filtering it out (could've used splice but was easier to filter it away instead of finding it's index)
    favourites = favourites.filter((favouriteCountry) => favouriteCountry.cca3 != country.cca3) || [];
    saveFavourites(favourites);
    createCardList();
}

export const createCardList = () => {
    cards.innerHTML = '';
    const searchQuery = searchInput.value.trim().toLowerCase();
    const favourites = getFavourites();
    // creating a map with each country code saving the country object itself for better country object comparison for non-favourites
    const favouriteMap = new Map(favourites.map((country) => [country.cca3, country]));

    // favourites first
    const filteredFavourites = favourites.filter(country => 
        country.name.common.toLowerCase().includes(searchQuery)
    );

    for (const country of filteredFavourites) {
        createCard(country, true);
    }

    // the rest of countries
    const filteredCountries = countries.filter(country => 
        !favouriteMap.has(country.cca3) &&
        country.name.common.toLowerCase().includes(searchQuery)
    );
    for (const country of filteredCountries) {
            createCard(country);
        }
}