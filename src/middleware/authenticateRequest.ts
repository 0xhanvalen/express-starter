import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@/lib/token";

// weird lil hack for later - see routes/example.ts for use
export default () =>
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization;
		if (!token) {
			// early return to save cycles :3
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
		const userId = verifyToken(token, "http");
		if (!userId) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
		// see types.d.ts for this "trick"
		req.userId = userId;
		// basically, add a userId to the request object so we know
		// 1. that we know you
		// 2. who you are
		next();
	};
