const renderer = new Renderer()
const model = new WeatherManager()

function renderAll() {
    renderer.renderWeather(model.cities)
}
async function getCity() {
    const cityName = $("#Search").val()
    const i = model.cities.findIndex((e) => e.name === cityName)
    if (i === -1) {
        console.log(cityName)
        await model.getCityData(cityName)
        console.log(model.cities)
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

async function generate(){
    await model.getCities()
    renderAll();
}

generate()
