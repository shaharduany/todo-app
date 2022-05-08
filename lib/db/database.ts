import mongoose from "mongoose";
import DB_URI from "./db-uri";

const MONGO_URI: string = DB_URI;
    
function getDb(): Promise {
	if (mongoose.connection.readyState >= 1) {
		return mongoose.connection.db;
	}

	return mongoose.connect(MONGO_URI);
}

export default getDb;