const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const address = document.querySelector('#search-input').value;
    const out = document.querySelector('#out');
    try {
        let data = await fetch(`/weather?address=${address}`)
        data = await data.json()
        out.innerHTML = `Your location is: ${data.timezone}. Temperature now is: ${Math.round(data.temp)}. Max temperature is: ${Math.round(data.maxTemp)}. The lowest temperature is: ${Math.round(data.lowTemp)}. The chance of rain is: ${Math.floor(data.precipProbability)}%.`
    } catch (e) {
        out.innerHTML = e
    }
}) 