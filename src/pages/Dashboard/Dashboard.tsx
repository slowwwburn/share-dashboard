import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./Dashboard.module.css";
import Overview from "./pages/Overview/Overview";
import { useContext, useEffect } from "react";
import WorkerContext from "../../store/workerContext";
import AuthContext from "../../store/authContext";
import Wallet from "./pages/Wallet/Wallet";
import CreateSharelink from "./pages/My Sharelinks/CreateSharelink";
import WalletContext from "../../store/walletContext";
import Settings from "./pages/Settings/Settings";
import LoadingSpinner from "../../components/Loader/Loader";
import DisplayContext from "../../store/displayContext";
import UsernameModal from "../../components/Modal/Username/UsernameModal";
import UpdatePassword from "../../components/Modal/Password/UpdatePassword";
import MySharelinks from "./pages/My Sharelinks/MySharelinks";

export const Dashboard = () => {
	const wtx = useContext(WalletContext);
	const atx = useContext(AuthContext);
	const dtx = useContext(WorkerContext);
	const query = new URLSearchParams(useLocation().search);

	useEffect(() => {
		console.log("hello");
		const token = query.get("token");
		if (token) {
			localStorage.setItem("userToken", token);
			const currentUrl = new URL(window.location.href);
			currentUrl.searchParams.delete("token");
			window.history.replaceState({}, document.title, currentUrl.toString());
		}
	}, [query]);

	useEffect(() => {
		console.log("dash toggle");
		dtx.toggleLoader();
		atx.onVerify();
		wtx.onGetWallet();
	}, []);

	return (
		<>
			{atx.isLoggedIn && (
				<div className={styles.dash}>
					{!atx.isUser.username && (
						<UsernameModal
							user={atx.isUser?.firstName || ""}
							inputRef={atx.usernameRef}
							change={atx.usernameHandler}
							blur={atx.validateUsername}
							submit={atx.onCreateUsername}
							logout={atx.onLogOut}
							error={atx.error}
						/>
					)}
					{atx.isUser.security && <UpdatePassword />}
					<div className={styles.dash_container}>
						<div className={`${styles.dash_side} ${styles.open}`}>
							<SideNav />
						</div>
						<div className={styles.dash_content}>
							<div className={styles.dash_top}>
								<TopBar />
							</div>
							<Routes>
								<Route path="/" element={<Overview />} />
								<Route path="/wallet" element={<Wallet />} />
								<Route path="/mysharelinks" element={<MySharelinks />} />
								<Route
									path="/mysharelinks/create"
									element={<CreateSharelink />}
								/>
								<Route path="/settings" element={<Settings />} />
							</Routes>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
