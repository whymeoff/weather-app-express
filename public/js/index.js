const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const address = document.querySelector('#search-input').value;
    const out = document.querySelector('#out');
    fetch(`/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                out.innerHTML = data.error;
            } else {
                out.innerHTML = `Your location is: ${data.timezone}. Temperature now is: ${data.temp}. Max temperature is: ${data.maxTemp}. The lowest temperature is: ${data.lowTemp}. The chance of rain is: ${data.precipProbability}%.`;
            }
        })
    })
    return false;
}) 