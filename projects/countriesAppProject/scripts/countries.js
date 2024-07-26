const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
};

const allCountries = await getCountries();
let countries = [...allCountries];

const search = (text) => {
    countries = countries.filter((country) => {
        let name = country.name.common.toLowerCase();
        return name.includes(text.toLowerCase());
    })
}

const reset = () => {
    countries = [...allCountries];
}

export {getCountries, countries, search, reset};