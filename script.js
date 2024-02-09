document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    const countriesDiv = document.getElementById('countries');

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'col-lg-4 col-sm-12';

        const card = document.createElement('div');
        card.className = 'card';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.textContent = country.name.common;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const capital = document.createElement('p');
        capital.textContent = `Capital: ${country.capital}`;

        const region = document.createElement('p');
        region.textContent = `Region: ${country.region}`;

        const latlng = document.createElement('p');
        latlng.textContent = `Latitude/Longitude: ${country.latlng[0]}, ${country.latlng[1]}`;

        const name = document.createElement('p');
        name.textContent = `Name: ${country.name.common} (${country.name.official})`;

        const flag = document.createElement('img');
        flag.src = country.flags.svg;
        flag.alt = 'Flag';

        const countryCodes = document.createElement('p');
        countryCodes.textContent = `Country Codes: ${country.cca2}, ${country.cca3}`;

        const weatherButton = document.createElement('button');
        weatherButton.className = 'btn btn-primary';
        weatherButton.textContent = 'Click for weather';
        weatherButton.addEventListener('click', async () => {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=f50d991e372632b3b193a1f32a46bbb8`);
            const weatherData = await weatherResponse.json();

            alert(`Weather in ${country.name.common}: ${weatherData.weather[0].description}`);
        });

        cardBody.appendChild(capital);
        cardBody.appendChild(region);
        cardBody.appendChild(latlng);
        cardBody.appendChild(name);
        cardBody.appendChild(flag);
        cardBody.appendChild(countryCodes);
        cardBody.appendChild(weatherButton);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        countryDiv.appendChild(card);

        countriesDiv.appendChild(countryDiv);
    });
});
