import dotenv from "dotenv";
dotenv.config();

// This is epic - run this code once and it will set the environment variables as variables so no dotenv barg
// also it will throw an error if the environment variables are not set

export const PORT = process.env.PORT + "";
export const JWT_SECRET = process.env.JWT_SECRET + "";

export function init() {
	if (PORT.length === 0) throw new Error("PORT is not set");
	if (JWT_SECRET.length === 0) throw new Error("JWT_SECRET is not set");
}
