import { PORT, init } from "./utils/env";
init(); // kill app if no env
import createRouter from "express-file-routing";

import express from "express";
import cors from "cors";
import http from "http";
import { WSS } from "./lib/wss";

async () => {
	const app = express();
	app.use(cors());
	app.use(express.json());
	await createRouter(app); // file router for awesome route management
	app.use((err: any, req: any, res: any, next: any) => {
		console.error(err);
		res.status(500).json({ error: err });
	}); // error handling middleware
	const server = http.createServer(app);
	server.on("upgrade", async (request, socket, head) => {
		const token = request.url?.split("?token=")[1];
		if (!token) {
			socket.destroy();
			return;
		}
		WSS.handleUpgrade(request, socket, head, (ws) => {
			WSS.emit("connection", ws, request);
		});
	});
	server.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};
