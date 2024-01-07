class WeatherManager{
    constructor(){
        this.cities = []
        this.getCitiesUrl = '/cities/'
    }
    async getCities(){
        const cities = await $.get(this.getCitiesUrl)
        return cities
    }
    async getCityData(cityName){
        const city = await $.get(this.getCitiesUrl+cityName)
        if(city.name){
            this.cities.push(city)
        }
        return city
    }
    async saveCity(city){
        const result = await $.post(this.getCitiesUrl, city)
        return result
    }
    async daleteCity(cityName){
        const result = await $.ajax({
            url: this.getCitiesUrl(),
            type: 'DELETE'
        });
        return result
    }

}