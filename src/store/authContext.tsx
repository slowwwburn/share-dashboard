import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import { axiosInstance } from "./axiosInstance";
import WorkerContext from "./workerContext";

export interface LoginUser {
	email: string;
	password: string;
}

export const AuthContext = createContext<{
	isUser: any;
	isLoggedIn: boolean;
	onLogOut: () => void;
	onVerify: () => void;
	onCreateUsername: (e: React.FormEvent<HTMLFormElement>) => void;
	onChangePassword: (e: React.FormEvent<HTMLFormElement>) => void;
	usernameRef: React.RefObject<HTMLInputElement> | null;
	currentPasswordRef: React.RefObject<HTMLInputElement> | null;
	newPasswordRef: React.RefObject<HTMLInputElement> | null;
	confirmNewPasswordRef: React.RefObject<HTMLInputElement> | null;
	usernameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	currentPasswordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	newPasswordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	confirmNewPasswordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateCurrentPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateConfirmNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error: string | null;
	invalidInput: boolean | null;
	usernameIsValid: boolean | null;
}>({
	isUser: {},
	isLoggedIn: false,
	onLogOut: () => {},
	onVerify: () => {},
	onCreateUsername: (e: React.FormEvent<HTMLFormElement>) => {},
	onChangePassword: (e: React.FormEvent<HTMLFormElement>) => {},
	usernameRef: null,
	currentPasswordRef: null,
	newPasswordRef: null,
	confirmNewPasswordRef: null,
	usernameHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	currentPasswordHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	newPasswordHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	confirmNewPasswordHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateUsername: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateCurrentPassword: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateConfirmNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => {},
	error: null,
	invalidInput: null,
	usernameIsValid: null,
});

const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,}$/;

const usernameReducer = (state: any, action: any) => {
	switch (action.type) {
		case "USER_INPUT":
			return {
				val: action.val, //typeof action.val === "string",
				isValid: action.val.length > 3,
			};
		default:
			return { val: "", isValid: null };
	}
};

const passwordReducer = (state: any, action: any) => {
	switch (action.type) {
		case "USER_INPUT":
			return {
				val: action.val,
				isValid: passwordRegEx.test(action.val.trim()),
			};
		case "FAILED_CONFIRM":
			return {
				val: action.val,
				isValid: false,
			};
		default:
			return { val: "", isValid: null };
	}
};

export const AuthContextProvider = ({ children }: any) => {
	const wtx = useContext(WorkerContext);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [status, setStatus] = useState(null);
	const [isUser, setIsUser] = useState<{ id?: string }>({});
	const usernameRef = useRef<HTMLInputElement>(null);
	const currentPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
	const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
		val: "",
		isValid: null,
	});
	const [currentPasswordState, dispatchCurrent] = useReducer(passwordReducer, {
		val: "",
		isValid: null,
	});
	const [newPasswordState, dispatchPassword] = useReducer(passwordReducer, {
		val: "",
		isValid: null,
	});
	const [confirmPasswordState, dispatchConfirm] = useReducer(passwordReducer, {
		val: "",
		isValid: null,
	});
	const [isError, setIsError] = useState<string | null>(null);
	const [invalidInput, setInvalidInput] = useState<boolean | null>(null);

	const { isValid: usernameIsValid } = usernameState;
	const { isValid: currentIsValid } = currentPasswordState;
	const { isValid: newPasswordIsValid } = newPasswordState;
	const { isValid: confirmPasswordIsValid } = confirmPasswordState;

	const validations = [
		{ isValid: usernameIsValid, ref: usernameRef },
		{ isValid: currentIsValid, ref: currentPasswordRef },
		{ isValid: newPasswordIsValid, ref: newPasswordRef },
		{ isValid: confirmPasswordIsValid, ref: confirmNewPasswordRef },
	];

	// const clearError = () => {
	// 	if (isError) setError(null);
	// 	if (invalidInput) setInvalidInput(null);
	// };

	const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		console.log(usernameRef.current?.value);
		dispatchUsername({ type: "USER_INPUT", val: e.target.value });
	};

	const currentPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		console.log(currentPasswordRef.current?.value);
		dispatchCurrent({ type: "USER_INPUT", val: e.target.value });
	};

	const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();

		const newPassword = e.target.value;
		const confirmPassword = confirmPasswordState.val;

		if (confirmPassword.length < 8 || newPassword === confirmPassword) {
			dispatchPassword({ type: "USER_INPUT", val: newPassword });
		} else {
			dispatchPassword({ type: "FAILED_CONFIRM", val: newPassword });
		}
	};

	const confirmNewPasswordHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		clearError();

		const confirmPassword = e.target.value;
		const newPassword = newPasswordState.val;

		if (newPassword === confirmPassword) {
			dispatchConfirm({ type: "USER_INPUT", val: confirmPassword });
		} else {
			dispatchConfirm({ type: "FAILED_CONFIRM", val: confirmPassword });
		}
	};

	const validateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		dispatchUsername({ type: "USER_INPUT", val: e.target.value });
	};

	const validateCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		dispatchCurrent({ type: "USER_INPUT", val: e.target.value });
	};

	const validateNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();

		const newPassword = e.target.value;
		const confirmPassword = confirmPasswordState.val;

		if (confirmPassword.length < 8 || newPassword === confirmPassword) {
			dispatchPassword({ type: "USER_INPUT", val: newPassword });
		} else {
			dispatchPassword({ type: "FAILED_CONFIRM", val: newPassword });
		}
	};

	const validateConfirmNewPassword = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		clearError();

		const confirmPassword = e.target.value;
		const newPassword = newPasswordState.val;

		if (newPassword === confirmPassword) {
			dispatchConfirm({ type: "USER_INPUT", val: confirmPassword });
		} else {
			dispatchConfirm({ type: "FAILED_CONFIRM", val: confirmPassword });
		}
	};

	const clearError = () => {
		if (isError) setIsError(null);
		if (invalidInput) setInvalidInput(null);
	};

	const verify = async () => {
		try {
			if (!localStorage.getItem("userToken")) {
				window.location.href = `${process.env.REACT_APP_WEBSITE}/auth/login`;
			}
			const { data } = await axiosInstance.get<any>(`/auth/token`);

			const verified = data.data;
			return verified;
		} catch (err: any) {
			localStorage.removeItem("userToken");
			setIsLoggedIn(false);
			window.location.href = `${process.env.REACT_APP_WEBSITE}/auth/login`;
			throw err;
		}
	};

	const onVerify = async () => {
		try {
			await verify();
			await getUser();
			setIsLoggedIn(true);
			wtx.toggleLoader();
		} catch (err: any) {
			console.log(err);
			wtx.toggleLoader();
			setStatus(err.response.status);
		}
	};

	const getUser = async () => {
		try {
			const { data } = await axiosInstance.get<any>(`/user/details`);
			setIsUser(data.data)
		} catch (err: any) {
			onLogOut()
			throw err;
		}
	};

	const createUsername = async (params: any) => {
		try {
			const { data } = await axiosInstance.post<any>(`/user/update/username`, {
				username: params.username,
			});

			const { username } = data.data;

			if (username) {
				setIsUser((prev) => {
					return { ...prev, username };
				});
			}
			return data.data;
		} catch (err: any) {
			setIsError(
				err.response?.data?.message ||
					"Username creation failed, Please try again"
			);
			throw err;
		}
	};

	const onCreateUsername = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		wtx.toggleLoader();
		console.log("Creating username");
		try {
			if (usernameIsValid) {
				const username = usernameRef.current?.value;
				await createUsername({ username });
				wtx.toggleLoader();
			} else {
				setInvalidInput(true);
				const firstInvalidInput = validations.find(
					(input) => !input.isValid || null
				);

				if (firstInvalidInput) {
					firstInvalidInput.ref?.current?.focus();
				}
				wtx.toggleLoader();
			}
		} catch (err: any) {
			wtx.toggleLoader();
		}
	};

	const changePassword = async (curPassword: string, newPassword: string) => {
		try {
			const { data } = await axiosInstance.post<any>("/user/update/password", {
				curPassword,
				newPassword,
			});
		} catch (err) {
			throw err;
		}
	};

	const onChangePassword = async (e: any) => {
		e.preventDefault();

		const current = currentPasswordRef.current?.value;
		const newPassword = newPasswordRef.current?.value;

		try {
			if (currentIsValid && newPasswordIsValid && confirmPasswordIsValid) {
				wtx.toggleLoader();
				if (current && newPassword) {
					await changePassword(current, newPassword);
					await getUser();
				}
				wtx.toggleLoader();
			} else {
				const firstInvalidInput = validations.find(
					(input) => !input.isValid || null
				);

				if (firstInvalidInput) {
					firstInvalidInput.ref?.current?.focus();
				}
			}
		} catch (err) {
			wtx.toggleLoader();
		}
	};

	const onLogOut = async () => {
		wtx.toggleLoader();
		console.log("Sending API request");
		try {
			const { data } = await axiosInstance.post<any>(`/auth/logout`);

			const logout = data;

			if (logout) {
				localStorage.removeItem("userToken");
				wtx.toggleLoader();
				setIsLoggedIn(false);
				window.location.href = `${process.env.REACT_APP_WEBSITE}/auth/login`;
			}
			return false;
		} catch (err: any) {
			wtx.toggleLoader();
			console.log(err.response);
			console.log(err.message);
			setStatus(err.response.status);
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isUser,
				isLoggedIn,
				onLogOut,
				onVerify,
				onChangePassword,
				onCreateUsername,
				usernameRef,
				currentPasswordRef,
				newPasswordRef,
				confirmNewPasswordRef,
				usernameHandler,
				currentPasswordHandler,
				newPasswordHandler,
				confirmNewPasswordHandler,
				validateUsername,
				validateCurrentPassword,
				validateNewPassword,
				validateConfirmNewPassword,
				error: isError,
				invalidInput,
				usernameIsValid,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
