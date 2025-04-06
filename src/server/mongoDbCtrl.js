import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config({path:'./.env'});


const dbconnectionUrl = process.env.BASE_URL;

let appDB = mongoose.createConnection(dbconnectionUrl)

const connectToAppDb = async () => {
	appDB.on('error', (err) => {
		console.error(`online_hiring: Connecting to App MongoDb Atlas online_hiring failed`);
		console.error(err);
	});
    await appDB.asPromise();
	appDB.once('open', function () {
		console.log(`online_hiring: Connected to App MongoDb Atlas online_hiring successfully`);
	});

    mongoose.set('debug', true);

}

export {
    appDB,
    connectToAppDb
}