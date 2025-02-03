import styles from "./App.module.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import logo from "./logo.svg";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useContext, useEffect } from "react";
import AuthContext from "./store/authContext";
import LoadingSpinner from "./components/Loader/Loader";
import WorkerContext from "./store/workerContext";
import UsernameModal from "./components/Modal/Username/UsernameModal";
import UpdatePassword from "./components/Modal/Password/UpdatePassword";

function App() {
	const atx = useContext(AuthContext);
	const wtx = useContext(WorkerContext);
	const navigate = useNavigate();

	return (
		<div className={styles.app}>
			{wtx.isLoading && <LoadingSpinner />}
			<Routes>
				<Route path="/*" element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;
