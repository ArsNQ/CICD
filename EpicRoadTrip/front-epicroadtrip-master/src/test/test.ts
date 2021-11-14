import {removePointRouter} from '../actions/router';

let router: any = [[
    {
        "location": {
            "lat": 50.62925,
            "lng": 3.057256
        },
        "address": "Lille, France",
        "name": "Lille, France",
    },
    {
        "name": "La Consigne",
        "location": {
            "lat": 50.62501902366828,
            "lng": 3.069697333367047,
        },
    },
    {
        "location": {
            "lat": 48.856614,
            "lng": 2.3522219
        },
        "name": "Paris, France",
        "isLast": true
    }
]];

test('remove point router', () => {
    const point: any = {
        "location": {
            "lat": 48.856614,
            "lng": 2.3522219
        },
        "name": "Paris, France",
    }

    router = removePointRouter(router, point);
    expect(router.length).toBe(2);
})

test('remove point router 2', () => {
    const point2: any = {
        "location": {
            "lat": 0,
            "lng": 0
        },
        "name": "Paris, France",
    }

    expect(removePointRouter(router, point2).length).toBe(3);
})
