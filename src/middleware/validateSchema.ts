import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export default function validateSchema<t>(schema: ZodSchema<t>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				// theoretically we log these errors if you want idk up to you
				// in this startpark we just ping it back to the client, not like they'd know what to do with it
				res.status(400).json({ error: error.errors });
			} else {
				res.status(500).json({ error: "Internal Server Error" });
			}
		}
	};
}
