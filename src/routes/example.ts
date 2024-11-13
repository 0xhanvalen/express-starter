// this file is available at `${url}/example`
// it can have multiple exports
import authenticateRequest from "@/middleware/authenticateRequest";
import validateSchema from "@/middleware/validateSchema";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const get = [
	authenticateRequest(),
	async (req: Request, res: Response, next: NextFunction) => {
		// this route is protected by the authenticateRequest middleware
		// req also has a userId property
		res.json({ message: `Hello, ${req.userId}!` });
	},
];

// the lifetime of input types is typically identical to the route,
// so in my starterpack, I put them in the same file

const pingPongSchema = z.object({
	message: z.string(),
});

export const post = [
	authenticateRequest(),
	validateSchema(pingPongSchema),
	async (req: Request, res: Response, next: NextFunction) => {
		// this route is protected by the authenticateRequest middleware
		res.json({ message: `Pong! ${req.body.message}` });
	},
];
