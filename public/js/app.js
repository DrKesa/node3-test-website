fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

console.log('test')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mesgOne = document.querySelector('#mesg-1')
const mesgTwo = document.querySelector('#mesg-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    mesgOne.textContent = 'Loading...'
    mesgTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                mesgOne.textContent = data.error
            } else {
                mesgOne.textContent = data.location
                mesgTwo.textContent = data.forecast
                // console.log(data.location)
                 console.log(data.forecast)
            }
        })
    })
})