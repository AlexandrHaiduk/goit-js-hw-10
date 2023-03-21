import Notiflix from 'notiflix';
import { debounce } from "lodash";

import { fetchCountries } from "./fetchCountries";

const inputEl = document.querySelector('input#search-box')
const countryListEl = document.querySelector('ul.country-list')
const countryInfoEl = document.querySelector('.country-info')

inputEl.addEventListener('input', debounce((e) => {
    let searchCountry = e.target.value.trim()
    countryListEl.innerHTML = ''

    fetchCountries(searchCountry).then((res) => {
        if (res.length === 0) {
            countryListEl.innerHTML = ""

            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        
        else if (res.length > 10) {
           return  Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
                
          );
        }
        else if (res.length < 10 && res.length > 1) {
            renderCountires(res)
        }

        else {
            renderOneCountry(res)
        }
    })

}, 300))


function renderCountires(data) {
    const markup = data.map(({flags, name}) => {
     return `<li>
        <img 
        class = "country-flag"
        src = "${flags.png}"
        width = "30px"
        heigth = "30px"
        /> 
        <h1>${name.official}</h1>
    
    </li>`
    }).join(''); 

 return countryListEl.innerHTML = markup;
 
}

function renderOneCountry(data) {
    const markup = data.map(({flags, name, capital, population, languages}) => {
     return `<li>
        <img 
        class = "country-flag"
        src = "${flags.png}"
        width = "30px"
        heigth = "30px"
        /> 
        <h1>${name.common}</h1>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>

 
    </li>`
    }).join(''); 

 return countryListEl.innerHTML = markup;
 
}

