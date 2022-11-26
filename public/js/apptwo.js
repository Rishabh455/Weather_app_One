console.log('client side java script')

// fetch(`http://localhost:3000/weather?address=${location}`)
//     .then(response => {
//       response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data);
//         }
//       })
//     })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('message-1');
const messageTwo = document.querySelector('message-2');
messageOne.textContent = 'From javascript';
 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent=""
    console.log(location);
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => {
      response.json().then((data) => {
        if (error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
      })
    })
    
})