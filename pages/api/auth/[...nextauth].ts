import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "../../../lib/db/database";
import TodoItem from "../../../lib/todos/todo-item";

const THREE_DAYS: number = 60 * 60 * 24 * 3;
const ONE_DAY: number = THREE_DAYS / 3;
const secret: string =  process.env.SECRET || "ASDFASDFASDFASDFAEWqwerqwe";

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
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
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorizationUrl:
				"https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
			async profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					todos: [],
					history: [],
				};
			},
		}),
	],
	pages: {
		newUser: "/welcome/",
	},
});