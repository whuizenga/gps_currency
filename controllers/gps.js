const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/', (req, res) => {
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const apikey = req.body.apikey

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`).then((resp) => {
        if(resp.data.error_message){
            res.json({
                error: resp.data.error_message,
                status: resp.data.status
            })
        } else {
            const country = resp.data.results[resp.data.results.length-1].formatted_address

            axios.get(`https://restcountries.eu/rest/v2/name/${country}`).then((cres) => {
                res.json({
                    country: country,
                    currency: cres.data[0].currencies
                })
            }).catch((err) => {
                console.log(err)
                res.json({
                    error: 'an error has occurred fetching currency data',
                    error_info: err
                })
            })
        }
    }).catch((err) => {
        console.log(err)
        res.json({
            error: 'an error has occured determining country',
            error_info: err
        })
    })
})
module.exports = router;