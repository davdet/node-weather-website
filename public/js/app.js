//Controlla il funzionamento dell'elemento HTML 'form' dove questo script viene caricato
const weatherForm = document.querySelector('form')
//Controlla il funzionamento dell'elemento HTML 'input' dove questo script viene caricato
const search = document.querySelector('input')
//Controlla il funzionamento dell'elemento con ID 'message-1' dove questo script viene caricato
const messageOne = document.querySelector('#message-1')
//Controlla il funzionamento dell'elemento con ID 'message-2' dove questo script viene caricato
const messageTwo = document.querySelector('#message-2')

const checkWeather = (location) => {
    //Fetch data from the URL and then run a callback function
    fetch('/weather?address=' + location).then((response) => {
        //Parse response in json format and then run a callback function
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}

//MAIN
weatherForm.addEventListener('submit', (e) => {
    //Previene il comportamento di default dell'elemento 'form'
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    checkWeather(location)
})

