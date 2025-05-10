import { getWeather } from '../../whther.js';
import City from '../models/city.js';
export const getAll = (req, res) => {
    City.find()
        .then(cities => {
            res.status(200).send(cities)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
export const add = (req, res) => {
    const { name } = req.body
    const newCity = new City({ name })
    newCity.save()
        .then(city => {res.status(200).send(city)})
                .catch(err => { err.message });
        }


export const getWeatherById = (req, res) => {
    console.log("gfhjnklm");
    
    const { id } = req.params
    if (!id) {
        return res.status(400).send({ error: 'city is required!' })
    }
    City.findById(id)
        .then(city => {
            if (!city)
                return res.status(404).send({ error: "City not found" })
            console.log(city.name);
            
            getWeather(city.name)
                .then(x => {
                        return res.status(200).send(x)
                })
                .catch(err => {
                    return res.status(500).send({ error: err })
                })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
