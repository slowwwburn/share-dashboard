import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DisplayContextProvider } from "./store/displayContext";
import { WorkerContextProvider } from "./store/workerContext";
import { AuthContextProvider } from "./store/authContext";
import { BrowserRouter } from "react-router-dom";
import { SharelinkContextProvider } from "./store/sharelinkContext";
import { WalletContextProvider } from "./store/walletContext";
import { WebSocketContextProvider } from "./store/socketContext";

localStorage.debug = "socket.io-client:*";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	// <React.StrictMode>
	<WebSocketContextProvider>
		<WorkerContextProvider>
			<AuthContextProvider>
				<DisplayContextProvider>
					<SharelinkContextProvider>
						<WalletContextProvider>
							<BrowserRouter>
								<App />
							</BrowserRouter>
						</WalletContextProvider>
					</SharelinkContextProvider>
				</DisplayContextProvider>
			</AuthContextProvider>
		</WorkerContextProvider>
	</WebSocketContextProvider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
