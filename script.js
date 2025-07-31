const apiKey = "c8204763e45726838b440ad83ca4db1f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Show current date
const date = new Date();
const formattedDate = date.toLocaleDateString("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});
const dateElement = document.createElement("p");
dateElement.textContent = formattedDate;
dateElement.style.textAlign = "center";
dateElement.style.color = "white";
dateElement.style.marginTop = "10px";
document.querySelector(".card").appendChild(dateElement);

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " km/h";

  // Set weather icon
  const weatherMain = data.weather[0].main;
  switch (weatherMain) {
    case "Clouds":
      weatherIcon.src = "img/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "img/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "img/rain.png";
      break;
    case "Drizzle":
      weatherIcon.src = "img/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "img/mist.png";
      break;
    default:
      weatherIcon.src = "img/clear.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

// On search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});

// On Enter key press
searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
  }
});
