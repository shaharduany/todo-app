import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import getDb from '../../../lib/db/database';

const THREE_DAYS: number = 60 * 60 * 24 * 3;
const ONE_DAY: number = THREE_DAYS / 3;
const secret: string =  "Thatsbullshititgothere";

export default NextAuth({
	adapter: MongoDBAdapter(getDb()),
	session: {
		strategy: "jwt",
		maxAge: THREE_DAYS,
		updateAge: ONE_DAY,
	},
	jwt: {
		maxAge: THREE_DAYS,
		secret,
	},
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
            async authorize(credentials){
                return null;
            }
		})
	]
});