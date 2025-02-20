import React, { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

// interface WebSocketContextProps {
// 	socket: typeof Socket | null;
// };

export const WebSocketContext = createContext<{
	socket: typeof Socket | null;
}>({
	socket: null,
});

export const WebSocketContextProvider = ({ children }: any) => {
	const [socket, setSocket] = useState<typeof Socket | null>(null);

	useEffect(() => {
		const socketServer = (process.env.REACT_APP_INTEGRATION_URL || "").replace(
			"/api/v1",
			""
		);
		const token = localStorage.getItem("userToken");
		const newSocket = io(socketServer, {
			auth: { token },
		});
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	return (
		<WebSocketContext.Provider value={{socket}}>
			{children}
		</WebSocketContext.Provider>
	);
};

export default WebSocketContext;
