const City = require('./City')
const axios = require('axios')
const API_KEY = "c0b3f3dd6c5e8d9d1062989696f6837d"

class CitysController {
    getGeolocation(longitude,latitude){
        const cityUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        return axios.get(cityUrl).then((result) => { 
            return result.data
        }).catch((err)=>{
            return err.response.data
        })
    }
    deleteCity(cityName) {
        return City.deleteMany({name:cityName}).then((deleted) => {
            return deleted
        })
    }
    addCity(city) {
        const CityDB = new City(city)
        return CityDB.save()
            .then((city) => {
                return { message:"Saved successfully"  }
            })
            .catch((err) => {
                console.log("Couldn't save")
                return { message:"Failed to save" }
            })
    }
    getAllCities() {
        return City.find({}).sort().then((citys) => {
            return citys;
        })
    }
    getCity(cityName){
        const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        return axios.get(cityUrl).then((result) => { 
            return result.data
        }).catch((err)=>{
            return err.response.data
        })
    }
    updateCity(cityName){
        const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        return axios.get(cityUrl).then((result) => { 
            const city =  result.data
            const resultCity = {name:city.name, temperature:city.main.temp,condition:city.weather[0].main,conditionPic:city.weather[0].icon, date: new Date(city.dt*1000)}
            return City.findOneAndReplace({name:cityName}, resultCity).then((result)=>{
                return resultCity
            })
        }).catch((err)=>{
            return err.response.data
        })

    }

}
const Citys = new CitysController()

module.exports = Citys
