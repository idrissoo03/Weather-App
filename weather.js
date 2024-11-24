const apiKey = "e2fdaae76db738dedec408a365e3e3f4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        // Log what city we're searching for
        console.log("Searching for city:", city);

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        
        // Log the full API response
        console.log("API Response:", data);

        // Check if we got an error from the API
        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        // First verify that all elements exist
        const cityElement = document.querySelector(".city");
        const tempElement = document.querySelector(".temp");
        const humidityElement = document.querySelector(".humidity");
        const windElement = document.querySelector(".wind");

        if (!cityElement || !tempElement || !humidityElement || !windElement) {
            console.error("One or more HTML elements not found!");
            console.log("City element:", cityElement);
            console.log("Temperature element:", tempElement);
            console.log("Humidity element:", humidityElement);
            console.log("Wind element:", windElement);
            return;
        }

        // Verify that all data exists before using it
        if (!data.name || !data.main || !data.wind) {
            console.error("Required data missing from API response!");
            return;
        }

        // Update the elements
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + "°C";
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = data.wind.speed + " km/h";

    } catch (error) {
        console.error("Error in checkWeather function:", error);
        alert("Error fetching weather data!");
    }
}

// Add check to ensure elements are found
if (!searchBox || !searchBtn) {
    console.error("Search elements not found!");
    console.log("Search box:", searchBox);
    console.log("Search button:", searchBtn);
} else {
    searchBtn.addEventListener("click", () => {
        if (searchBox.value.trim() !== "") {
            checkWeather(searchBox.value);
        } else {
            alert("Please enter a city name!");
        }
    });

    // Add Enter key support
    searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && searchBox.value.trim() !== "") {
            checkWeather(searchBox.value);
        }
    });
}