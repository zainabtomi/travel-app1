const countDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert milliseconds to days
  return diffDays;
};


const tripInfo = (
  geoCoordinates,
  weatherForecast,
  locationImage,
  start,
  end
) => {
  const tripLength = countDays(start, end);
  const tripDetailsContainer = document.getElementById("details");

  tripDetailsContainer.innerHTML = `
        <img src="${locationImage}" alt="${geoCoordinates.countryName}" class="desimg">
        <p>Departure Date: ${start}</p>
        <p>Return Date: ${end}</p>
        <p>Trip Length: ${tripLength} days</p>
        <p>Weather Forecast: The temp is ${weatherForecast.data[0].temp}°C and there is ${weatherForecast.data[0].weather.description}</p>
      `;
};
const primaryObject = {
  destination: "placeholder_destination",
  startDate: "placeholder_startDate",
  returnDate: "placeholder_returnDate",
  weather: {
    description: "placeholder_weather_description",
    temp: 0,
  },
  imageUrl: "placeholder_image_url"
};


const getFromPixabayAPI = async (destination) => {
  const pixabayApiKey = "49386127-68e0740b7017051b52b11a833";
  const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(destination)}&image_type=photo`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Pixabay API encountered an issue: ${response.status}`);
  }

  const data = await response.json();
  return data.hits.length > 0 ? data.hits[0].webformatURL : "default_image_url";
};


const getFromGeonamesAPI = async (destination) => {
  const geonamesUsername = "zainab2";
  const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${geonamesUsername}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geonames API encountered an issue: ${response.status}`);
  }

  const data = await response.json();

  if (data.geonames && data.geonames.length > 0) {
    const { lat, lng } = data.geonames[0];
    return { lat, lng };
  } else {
    throw new Error("Destination not Found");
  }
};

const getFromWeatherbit = async (latitude, longitude) => {
  const weatherbitApiKey = "6117e3a90c254bf5b62eb5c236da71a7";
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API encountered an issue: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export {
  tripInfo,
  getFromGeonamesAPI,
  getFromWeatherbit,
  getFromPixabayAPI,
  countDays,
  primaryObject,
};