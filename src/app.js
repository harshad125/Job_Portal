import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import setRoutes from './server/routeCtrl.js'
import tokenUtils from "./helper/jwt/tokenUtils.js"

const app = express()


const initilization = async () => {
    app.use(express.json())
    // app.use(express.urlencoded())
    // app.use(express.static("public"))
    // app.use(cookieParser())


    const allowedOrigins = [
		'http://localhost:3000'
	];

    app.use(
		cors({
			origin: function (origin, callback) {
				if (_.isNull(origin) || _.isUndefined(origin) || origin === 'null') {
					return callback(null, true);
				}

				if (allowedOrigins.indexOf(origin) === -1) {
					console.log('Skuvent: Allowed origins:', allowedOrigins);

					const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
					return callback(new Error(msg), false);
				}

				return callback(null, true);
			},
			credentials: true,
			preflightContinue: true,
			exposedHeaders: [
				'Access-Control-Allow-Headers',
				'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
			],
			optionsSuccessStatus: 200,
		}),
	);

    setRoutes(app);


    tokenUtils.setTokens();



}


// app.use(cookieParser("javiyaharshad")) - it will use if you want encrypt the cookie data
// app.use(session({
//     secret:"javiyaharshad",
//     saveUninitialized:false,
//     resave:false,
//     cookie:{
//         maxAge:60000
//     }
// }))



initilization();


export { app }