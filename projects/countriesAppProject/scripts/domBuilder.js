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

    const population = document.createElement('p');
    population.className = 'card-text';
    population.innerText = `Population: ${country.population.toLocaleString()}`;

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

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(population);
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
}

const removeFavourite = (country) => {
    let favourites = getFavourites();
    // remove favourite country from the country by filtering it out (could've used splice but was easier to filter it away instead of finding it's index)
    favourites = favourites.filter((favouriteCountry) => favouriteCountry.cca3 != country.cca3) || [];
    saveFavourites(favourites);
}

export const createCardList = () => {
    const favourites = getFavourites();
    // creating a map with each country code saving the country object itself for better country object comparison for non-favourites
    const favouriteMap = new Map(favourites.map((country) => [country.cca3, country]));

    // favourites first
    for (const country of favourites) {
        createCard(country, true);
    }

    // the rest of countries
    for (const country of countries) {
        if (!favouriteMap.has(country.cca3)) {
            createCard(country);
        }
    }
}