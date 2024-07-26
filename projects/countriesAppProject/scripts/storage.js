export const getFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    return favourites;
}

export function saveFavourites(favourites) {
    localStorage.setItem('favourites', JSON.stringify(favourites));
}