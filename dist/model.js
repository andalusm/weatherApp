class WeatherManager{
    constructor(){
        this.cities = []
        this.getCitiesUrl = '/cities/'
    }
    async getCities(){
        const cities = (await $.get(this.getCitiesUrl)).cities
        console.log(cities)
        cities.forEach(city => {
            city.saved = true;   
        });
        this.cities = cities
    }
    async getCityData(cityName){
        const city = await $.get(this.getCitiesUrl+cityName)
        if(city){
            city.city.saved = false
            this.cities.push(city.city)
        }
    }
    async saveCity(city){
        const result = await $.post(this.getCitiesUrl, city)
        return result
    }
    async deleteCity(cityName){
        const result = await $.ajax({
            url: this.getCitiesUrl+cityName,
            type: 'DELETE'
        });
        return result
    }
}
