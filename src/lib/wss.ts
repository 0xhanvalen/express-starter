import { OPEN, Server, type WebSocket } from "ws";
import { verifyToken } from "./token";

const connectedUsers = new Map<string, { clients: WebSocket[] }>();

export const get_connected_users = () => {
	// list the keys of the connectedUsers
	const connectedUsersArray = Array.from(connectedUsers.values());
	return connectedUsersArray;
};

export const WSS = new Server({ noServer: true });

WSS.on("connection", async (ws, request) => {
	const token = request.url!.split("?token=")[1];
	if (!token) {
		ws.close();
		return;
	}
	const userId = verifyToken(token, "ws");
	if (!userId) {
		ws.close();
		return;
	}
	console.log(`[ws]: User ${userId} connected`);
	ws.on("close", () => {
		console.log(`[ws]: User ${userId} disconnected`);
		const oldConnectedUser = connectedUsers.get(userId);
		if (oldConnectedUser)
			connectedUsers.set(userId, {
				clients:
					oldConnectedUser.clients.filter((client) => client !== ws) || [],
			});
	});
});

// parse ws results on the front end to manage UI locations + styles via type
// do whatever u want here
type WsMessageArgs = {
	message?: string;
	type?: string;
};

export function sendMessageToUser({
	user_id,
	args,
}: {
	user_id: string;
	args: WsMessageArgs;
}) {
	connectedUsers.get(user_id)?.clients.forEach((clientWs) => {
		if (clientWs.readyState === OPEN) {
			clientWs.send(JSON.stringify(args));
		}
	});
}
