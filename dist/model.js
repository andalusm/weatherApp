class WeatherManager{
    constructor(){
        this.cities = []
        this.getCitiesUrl = '/cities/'
    }
    async getGeolocation(longitude, latitude, saved = false){
        console.log(longitude,latitude)
        const city = await $.get(`/cities/${longitude}/${latitude}`) 
        if(city){
            console.log(city)
            city.city.saved = saved
            this.cities.push(city.city)
        }     
        
    }
    removeCityFromArray(cityName){
        const i = this.cities.findIndex((e) => e.name.toLowerCase() === cityName.toLowerCase())
        console.log(i, this.cities, cityName)
        const saved = this.cities[i].saved
        this.cities.splice(i,1)
        return saved        
    }
    async getCities(){
        const cities = (await $.get(this.getCitiesUrl)).cities
        cities.forEach(city => {
            city.saved = true;   
        });
        this.cities = this.cities.concat(cities)
    }
    async getCityData(cityName, saved = false){
        const city = await $.get(this.getCitiesUrl+cityName)
        if(city){
            city.city.saved = saved
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
    async updateCity(cityName, saved= true){
        const result = await $.get("/updatedCity/"+cityName)
        result.saved = saved
        this.cities.push(result)      
    }
}
