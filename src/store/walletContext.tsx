import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import {
	walletAxios,
	integrationAxios,
} from "../../../sharelink/src/store/axiosInstance";
import Utils from "./util";
import PaystackPop from "@paystack/inline-js";
import DisplayContext from "./displayContext";
import io, { Socket } from "socket.io-client";
import WorkerContext from "./workerContext";

type WalletType = {
	id?: string;
	balance?: string;
	dvaccount?: string;
};

export const WalletContext = createContext<{
	aWallet: WalletType;
	transactions: any;
	amountRef: React.RefObject<HTMLInputElement> | null;
	amountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateAmountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onGetWallet: () => void;
	onFundWallet: (userId: string) => void;
	onGetTransactions: () => void;
	page: { pageNumber?: number; totalPages?: number };
	onPrevPage: () => void;
	onNextPage: () => void;
}>({
	aWallet: {},
	transactions: {},
	amountRef: null,
	amountHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateAmountHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	onGetWallet: () => {},
	onFundWallet: () => {},
	onGetTransactions: () => {},
	page: {},
	onPrevPage: () => {},
	onNextPage: () => {},
});

const amountReducer = (state: any, action: any) => {
	switch (action.type) {
		case "USER_INPUT":
			return { val: action.val, isValid: parseInt(action.val) >= 100 };
		default:
			return { val: "", isValid: null };
	}
};

export const WalletContextProvider = ({ children }: any) => {
	const dtx = useContext(DisplayContext);
	const wtx = useContext(WorkerContext);

	const [wallet, setWallet] = useState<WalletType>({});
	const [transactions, setTransactions] = useState<any>([]);
	const [page, setPage] = useState<{
		pageNumber?: number;
		totalPages?: number;
	}>({});

	const amountRef = useRef<HTMLInputElement>(null);
	const [amountState, dispatchAmount] = useReducer(amountReducer, {
		val: "",
		isValid: null,
	});

	const [socket, setSocket] = useState<typeof Socket | null>(null); // Store the socket instance

	useEffect(() => {
		const wallet_url = (process.env.REACT_APP_INTEGRATION_URL || "").replace(
			"/api/v1",
			""
		);
		const token = localStorage.getItem("userToken");
		const newSocket = io(wallet_url, {
			auth: { token },
		});
		setSocket(newSocket);

		newSocket.on("walletBalanceUpdate", (newBalance: string) => {
			setWallet((prev) => ({
				...prev,
				balance: Utils.formatNumber(newBalance),
			}));
		});

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const { isValid: amountIsValid } = amountState;

	const amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchAmount({ type: "USER_INPUT", val: e.target.value });
	};

	const validateAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchAmount({ type: "USER_INPUT", val: e.target.value });
	};

	const getWallet = async () => {
		try {
			const { data } = await walletAxios.get<any>("/wallet");

			setWallet((wallet) => {
				return {
					id: data.data.id,
					balance: Utils.formatNumber(data.data.availableBalance),
					dvaccount: data.data.dvaccountNumber,
				};
			});
			return data.data;
		} catch (err: any) {
			// setStatus(err.response.status)
			// throw err;
		}
	};

	const onGetWallet = async () => {
		try {
			return await getWallet();
		} catch (err) {
			throw err;
		}
	};

	const fundWallet = async (params: any) => {
		try {
			console.log(params);
			const { data } = await integrationAxios.post<any>(
				"/paystack/collection/init",
				{ amount: parseFloat(params.amount) * 100, userId: params.userId }
			);
			return data.data;
		} catch (err: any) {
			throw err;
		}
	};

	const onFundWallet = async (userId: string) => {
		try {
			if (amountIsValid) {
				if (!amountRef.current) return;
				const amount = amountRef.current.value;
				wtx.toggleLoader();
				const initiate = await fundWallet({ userId, amount });
				dtx.onToggleModal();
				const popup = new PaystackPop();
				popup.resumeTransaction(initiate.access_code, {
					onSuccess: async (response: any) => {
						socket?.on("walletUpdate", async (data: any) => {
							if (data.status) await getWallet();
						});
						wtx.toggleLoader();
					},
					onCancel: () => {
						wtx.toggleLoader();
						console.log("Payment canceled by the user");
					},
					onClose: () => {
						wtx.toggleLoader();
						console.log("Payment modal closed");
					},
				});
			}
		} catch (err: any) {
			wtx.toggleLoader();
		}
	};

	const getTransactions = async (page?: any) => {
		try {
			const { data } = await walletAxios.get<any>(
				`/wallet/${wallet.id}/transactions?page=${page}`
			);
			setTransactions(data.data.transactions);
			setPage((prevData) => {
				return {
					pageNumber: data.data.pagination.currentPage,
					totalPages: data.data.pagination.totalPages,
				};
			});
		} catch (err: any) {
			throw err;
		}
	};

	const onGetTransactions = async () => {
		wtx.toggleLoader();
		try {
			await getTransactions();
			wtx.toggleLoader();
		} catch (err: any) {
			wtx.toggleLoader();
		}
	};

	const onPrevPage = async () => {
		try {
			wtx.toggleLoader();
			const next = (page.pageNumber || 1) - 1;
			await getTransactions(next);

			wtx.toggleLoader();
		} catch (err) {
			wtx.toggleLoader();
		}
	};

	const onNextPage = async () => {
		try {
			wtx.toggleLoader();
			const next = (page.pageNumber || 1) + 1;
			await getTransactions(next);

			wtx.toggleLoader();
		} catch (err) {
			wtx.toggleLoader();
		}
	};

	return (
		<WalletContext.Provider
			value={{
				aWallet: wallet,
				transactions,
				amountRef,
				amountHandler,
				validateAmountHandler,
				onGetWallet,
				onFundWallet,
				onGetTransactions,
				page,
				onPrevPage,
				onNextPage,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
};

export default WalletContext;
