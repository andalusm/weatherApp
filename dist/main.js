const renderer = new Renderer()
const model = new WeatherManager()
let latitude = 0
let longitude = 0

function renderAll() {
    renderer.renderWeather(model.cities)
}
async function getCity() {
    const cityName = $("#Search").val()
    const i = model.cities.findIndex((e) => e.name.toLowerCase() === cityName.toLowerCase())
    if (i === -1) {
        await model.getCityData(cityName)
        renderAll()
    }
}

async function addOrDeleteCity(cityName) {
    const city = model.cities.find((e) => e.name === cityName)
    if (city.saved) {
        model.deleteCity(cityName)
    }
    else {
        model.saveCity(city)
    }
    city.saved = !city.saved
    renderAll()
}

async function generate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        await model.getCities()
        renderAll();
    }
}

async function refresh(cityName) {
    const saved = model.removeCityFromArray(cityName)
    if (!saved) {
        await model.getCityData(cityName, saved)
    }
    else {
        await model.updateCity(cityName, saved)
    }
    renderAll();
}

async function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    await model.getGeolocation(longitude, latitude)
    await model.getCities()
    renderAll();
}



generate()
