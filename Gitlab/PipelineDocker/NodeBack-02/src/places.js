const express = require('express');
const router = new express.Router();
const axios = require('axios');

const config = require('./../config');

router.get('/autocomplete', (req, res) => {

    if (!req.query.hasOwnProperty('input') || req.query.input === '') {
        res.status(200).json({
            success: false,
            message: "Missing input property in request or invalid arguments"
        });
    } else {
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.input}&key=${config.googleAutocomplete_key}`)
            .then((result) => {
                res.status(200).json({
                    success: true,
                    data: result.data
                })
            }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
})

router.get('/getLocalisationPlace', (req, res) => {

    if (!req.query.hasOwnProperty('place_id') || req.query.place_id === '') {
        res.status(200).json({
            success: false,
            message: "Missing input property in request or invalid arguments"
        });
    } else {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${req.query.place_id}&key=${config.googleAutocomplete_key}`)
            .then((result) => {
                res.status(200).json({
                    success: true,
                    data: result.data.results
                })
            }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
})

function formatResponse (response) {
    let result = [];

    for (let groupsPlace of response.data.response.groups) {
        let group = {
            type: groupsPlace.type,
            items: []
        }
        for (let place of groupsPlace.items) {
            let tmp = {
                name: place.venue.name,
                location: place.venue.location,
                categories: place.venue.categories
            }
            group.items.push(tmp);
        }
        result.push(group);
    }

    return result;
}

router.get('/drink', (req, res) => {

    if (!req.query.hasOwnProperty('ll') && !req.query.hasOwnProperty('near')) {
        res.status(400).json({
            success: false,
            message: "Missing coordinate in request"
        })
    } else {
        axios.get('https://api.foursquare.com/v2/venues/explore', {
            params: {
                client_id: config.foursquare_id,
                client_secret: config.foursquare_secret,
                v: config.foursquare_v,
                locale: 'fr',
                ...req.query,
                categoryId: '4d4b7105d754a06376d81259'
            }
        }).then((response) => {
            res.status(200).json({
                success: true,
                data: formatResponse(response)
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
});

router.get('/eat', (req, res) => {

    if (!req.query.hasOwnProperty('ll') && !req.query.hasOwnProperty('near')) {
        res.status(400).json({
            success: false,
            message: "Missing coordinate in request"
        })
    } else {
        axios.get('https://api.foursquare.com/v2/venues/explore', {
            params: {
                client_id: config.foursquare_id,
                client_secret: config.foursquare_secret,
                v: config.foursquare_v,
                locale: 'fr',
                ...req.query,
                categoryId: '4d4b7105d754a06374d81259'
            }
        }).then((response) => {
            res.status(200).json({
                success: true,
                data: formatResponse(response)
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
});

router.get('/enjoy', (req, res) => {

    if (!req.query.hasOwnProperty('ll') && !req.query.hasOwnProperty('near')) {
        res.status(400).json({
            success: false,
            message: "Missing coordinate in request"
        })
    } else {
        axios.get('https://api.foursquare.com/v2/venues/explore', {
            params: {
                client_id: config.foursquare_id,
                client_secret: config.foursquare_secret,
                v: config.foursquare_v,
                locale: 'fr',
                ...req.query,
                categoryId: '4d4b7105d754a06373d81259,4d4b7104d754a06370d81259,4d4b7105d754a06377d81259'
            }
        }).then((response) => {
            res.status(200).json({
                success: true,
                data: formatResponse(response)
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
});

router.get('/travel', (req, res) => {

    if (!req.query.hasOwnProperty('ll') && !req.query.hasOwnProperty('near')) {
        res.status(400).json({
            success: false,
            message: "Missing coordinate in request"
        })
    } else {
        axios.get('https://api.foursquare.com/v2/venues/explore', {
            params: {
                client_id: config.foursquare_id,
                client_secret: config.foursquare_secret,
                v: config.foursquare_v,
                locale: 'fr',
                ...req.query,
                categoryId: '4bf58dd8d48988d1ed931735,5744ccdfe4b0c0459246b4e8,4e4c9077bd41f78e849722f9,5744ccdfe4b0c0459246b4c1,4bf58dd8d48988d12d951735,52f2ab2ebcbc57f1066b8b4b,4bf58dd8d48988d1fe931735,52f2ab2ebcbc57f1066b8b4f,52f2ab2ebcbc57f1066b8b50,55077a22498e5e9248869ba2,4bf58dd8d48988d1fd931735,56aa371be4b08b9a8d57353e,4bf58dd8d48988d1ef941735,53fca564498e1a175f32528b,4bf58dd8d48988d130951735,4bf58dd8d48988d129951735,52f2ab2ebcbc57f1066b8b51,54541b70498ea6ccd0204bff'
            }
        }).then((response) => {
            res.status(200).json({
                success: true,
                data: formatResponse(response)
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
});

router.get('/sleep', (req, res) => {

    if (!req.query.hasOwnProperty('ll') && !req.query.hasOwnProperty('near')) {
        res.status(400).json({
            success: false,
            message: "Missing coordinate in request"
        })
    } else {
        axios.get('https://api.foursquare.com/v2/venues/explore', {
            params: {
                client_id: config.foursquare_id,
                client_secret: config.foursquare_secret,
                v: config.foursquare_v,
                locale: 'fr',
                ...req.query,
                categoryId: '4bf58dd8d48988d1fa931735'
            }
        }).then((response) => {
            res.status(200).json({
                success: true,
                data: formatResponse(response)
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
});

router.get('/shopping', (req, res) => {

    if (!req.query.hasOwnProperty('ll') && !req.query.hasOwnProperty('near')) {
        res.status(400).json({
            success: false,
            message: "Missing coordinate in request"
        })
    } else {
        axios.get('https://api.foursquare.com/v2/venues/explore', {
            params: {
                client_id: config.foursquare_id,
                client_secret: config.foursquare_secret,
                v: config.foursquare_v,
                locale: 'fr',
                ...req.query,
                categoryId: '4d4b7105d754a06378d81259'
            }
        }).then((response) => {
            res.status(200).json({
                success: true,
                data: formatResponse(response)
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
});

router.get('/explore', (req, res) => {

    if (!req.query.hasOwnProperty('ll') && !req.query.hasOwnProperty('near')) {
        res.status(400).json({
            success: false,
            message: "Missing coordinate in request"
        })
    } else {
        axios.get('https://api.foursquare.com/v2/venues/explore', {
            params: {
                client_id: config.foursquare_id,
                client_secret: config.foursquare_secret,
                v: config.foursquare_v,
                locale: 'fr',
                ...req.query
            }
        }).then((response) => {
            res.status(200).json({
                success: true,
                data: formatResponse(response)
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: "Bad request"
            })
        })
    }
});

module.exports = router;
