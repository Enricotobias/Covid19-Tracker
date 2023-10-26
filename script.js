document.addEventListener('DOMContentLoaded', function() {
    const rapidApiKey = '3c8f457e48msh573618924841771p10bc34jsn30cfeed6189d';
    const globalDataUrl = 'https://covid-193.p.rapidapi.com/statistics';
    const countriesUrl = 'https://covid-193.p.rapidapi.com/countries';

    const countrySearch = document.getElementById('countrySearch');
    const datalistOptions = document.getElementById('datalistOptions');

    function fetchCountryList() {
        fetch(globalDataUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
                'X-RapidAPI-Key': rapidApiKey 
            }
        })
        .then(response => response.json())
        .then(data => {
            const countries = data.response.map(country => country.country);
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                datalistOptions.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
    }
    fetchCountryList();

    searchButton.addEventListener('click', function() {
        const countryName = countrySearch.value;
        if (countryName) {
            fetch(globalDataUrl, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
                    'X-RapidAPI-Key': rapidApiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                const countryData = data.response.find(item => item.country.toLowerCase() === countryName.toLowerCase());
                if (countryData) {
                    document.getElementById('activeCases').textContent = countryData.cases.active || 0;
                    document.getElementById('newCases').textContent = countryData.cases.new || 0;
                    document.getElementById('recoveredCases').textContent = countryData.cases.recovered|| 0;
                    document.getElementById('totalCases').textContent = countryData.cases.total || 0;
                    document.getElementById('totalDeaths').textContent = countryData.deaths.total || 0;
                    document.getElementById('totalCasesGlobal').textContent = countryData.cases.total || 0;
                } else {
                    alert('Negara tidak ditemukan. Silakan coba lagi.');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
