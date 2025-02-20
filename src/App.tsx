import styles from "./App.module.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useContext, useEffect } from "react";
import AuthContext from "./store/authContext";
import LoadingSpinner from "./components/Loader/Loader";
import WorkerContext from "./store/workerContext";
import { ToastContainer, toast } from "react-toastify";
import UsernameModal from "./components/Modal/Username/UsernameModal";
import UpdatePassword from "./components/Modal/Password/UpdatePassword";

function App() {
	const atx = useContext(AuthContext);
	const wtx = useContext(WorkerContext);

	return (
		<div className={styles.app}>
			{wtx.isLoading && <LoadingSpinner />}
			<ToastContainer/>
			<Routes>
				<Route path="/*" element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;
