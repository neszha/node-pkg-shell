const ip = require('ip');
const cors = require('cors');
const moment = require('moment');
const morgan = require('morgan');
const dotenv = require('dotenv');
const process = require('process');
const express = require('express');
const CryptoJS = require('crypto-js');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

module.exports = {

    async setup() {
        dotenv.config();

        /** Create express app. */
        const app = express();
        const httpServer = createServer(app);

        /** Middlewhare express in main level. */
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(fileUpload());

        /** Record http traffic. */
        app.use((req, res, next) => next());

        /** Simple API. */
        const randomString = randomstring.generate(1024);
        const hashId = CryptoJS.SHA512(randomString).toString(CryptoJS.enc.Hex);
        app.get('/', (req, res) => {
            res.json({
                msg: 'Api server is ready.',
                timestamp: moment().format(),
                processId: hashId,
            });
        });

        app.get('/api/welcome', (req, res) => {
            const { name } = req.query;
            res.json({
                msg: `Welcome, ${name || '-'}`,
                timestamp: moment().format(),
            });
        });

        /** Starting HTTP server. */
        const myIp = ip.address();
        const port = process.env.PORT || 8000;
        httpServer.listen(port, () => {
            console.log(`[${process.pid}] Server starting and listening on ${myIp}:${port}`);
        });
    },

};
