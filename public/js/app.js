const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`form input`);
const messageOne = document.querySelector(`#message-1`);
const messageTwo = document.querySelector(`#message-2`);

weatherForm.addEventListener(`submit`, event => {
  event.preventDefault();

  messageOne.textContent = `Loading...`;
  messageTwo.textContent = ``;

  const searchLocation = search.value;
  const url = `http://localhost:3000/weather?address=${searchLocation}`;
  fetch(url).then(response => {
    response.json().then(({ error, location, forecast }) => {
      if (error) {
        messageOne.textContent = error;
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    });
  });
});
