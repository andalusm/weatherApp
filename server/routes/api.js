const express = require('express')
const router = express.Router()
const CitysController = require('../model/utils')

router.get('/cities/:cityName/', function (req, res) {
    const cityName = req.params.cityName;
    CitysController.getCity(cityName).then((city)=>{
        if(city.cod === "404"){
            res.status(404).send({error:city.message})
        }
        else{
            const resultCity = {name:city.name, temperature:city.main.temp,condition:city.weather[0].main,conditionPic:city.weather[0].icon}
            res.status(200).send({city:resultCity})
        }
        
    })
    
})
router.get('/cities/', function (req, res) {
    CitysController.getAllCities().then((cities)=>{
            res.status(200).send({cities:cities})
        
    })
    
})
router.delete('/cities/:cityName/', function (req, res) {
    const cityName = req.params.cityName;
    CitysController.deleteCity(cityName).then((result)=>{
            res.status(200).send({result})
    })
    
})
router.post('/cities/', function (req, res) {
    const city = req.body;
    CitysController.addCity(city).then((result)=>{
            res.status(200).send({result})
    })
    
})



module.exports = router
