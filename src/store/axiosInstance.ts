import axios from "axios";

const axiosInstance = axios.create({});
const axiosInstance2 = axios.create({});
const walletAxios = axios.create({});
const integrationAxios = axios.create({});

axiosInstance.interceptors.request.use((config) => {
	const loggedInUser = localStorage.getItem("userToken");
	if (loggedInUser) {
		config.headers = { Authorization: `Bearer ${loggedInUser}` };
	}
	config.baseURL = process.env.REACT_APP_AUTH_BASE_URL;
	config.withCredentials = true;
	return config;
});

axiosInstance2.interceptors.request.use((config) => {
	const loggedInUser = localStorage.getItem("userToken");
	if (loggedInUser) {
		config.headers = { Authorization: `Bearer ${loggedInUser}` };
	}
	config.baseURL = process.env.REACT_APP_SHARELINK_BASE_URL;
	config.withCredentials = true;
	return config;
});

walletAxios.interceptors.request.use((config) => {
	const loggedInUser = localStorage.getItem("userToken");
	if (loggedInUser) {
		config.headers = { Authorization: `Bearer ${loggedInUser}` };
	}
	config.baseURL = process.env.REACT_APP_WALLET_BASE_URL;
	config.withCredentials = true;
	return config;
});

integrationAxios.interceptors.request.use((config) => {
	const loggedInUser = localStorage.getItem("userToken");
	if (loggedInUser) {
		config.headers = { Authorization: `Bearer ${loggedInUser}` };
	}
	config.baseURL = process.env.REACT_APP_INTEGRATION_BASE_URL;
	config.withCredentials = true;
	return config;
});

export { axiosInstance, axiosInstance2, walletAxios, integrationAxios };
