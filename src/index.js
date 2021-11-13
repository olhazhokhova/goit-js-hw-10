import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetch from './api/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  fetch(inputRef.value).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length >= 2 && data.length <= 10) {
      renderSeveralCountriesMarkup(data);
    } else if (data.length === 1) {
      renderOneCountryMarkup(data[0]);
    }
  });
}

function renderSeveralCountriesMarkup(data) {
  const markup = data
    .map(({ flags, name }) => `<li><img src="${flags.svg}"/> ${name.official}</li>`)
    .join('');

  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}

function renderOneCountryMarkup({ flags, name, capital, population, languages }) {
  countryList.innerHTML = `<li><img src="${flags.svg}"/> ${name.official}</li>`;
  countryInfo.innerHTML = `
    <ul>
        <li><strong>Capital:</strong> ${capital}</li>
        <li><strong>Population:</strong> ${population}</li>
        <li><strong>Languages:</strong> ${Object.values(languages).join(', ')}</li>
    </ul>`;
}
