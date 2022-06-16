const express = require('express')
const cors = require('cors');
const app = express();

app.use(cors({origin: true}));

app.get('/', (req, res) => {
    res.status(404).json({
        message: 'Not found'
    })
});

const placesCtrl = require('./src/places')

app.use('/places/', placesCtrl);

if(require.main === module){
    app.listen((process.env.BACK_PORT || 8080), () => {
        const os = require('os');
        const ifaces = os.networkInterfaces();
    
        console.log('[EXPRESS] Listening on: 127.0.0.1:' + (process.env.BACK_PORT || 8080));
        Object.keys(ifaces).forEach(function (ifname) {
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }
                if (iface.address.includes('10.') || iface.address.includes('192.'))
                    console.log('[EXPRESS] Listening on:', iface.address + ':' + (process.env.BACK_PORT || 8080));
            });
        });
    });
}

module.exports = app;

