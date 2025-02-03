import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import { axiosInstance, axiosInstance2 } from "../store/axiosInstance";
import AuthContext from "./authContext";
import Util from "./util";
import WorkerContext from "./workerContext";
import WalletContext from "./walletContext";

export interface SharelinkType {
	name?: string;
	goal?: string;
	type?: string;
	size?: string;
	item?: any[];
	startDate?: string;
	endDate?: string;
	amount?: string;
	total?: string;
	image?: Blob;
	imageName?: string;
	imageUrl?: string;
	userId?: string;
	users?: any[];
}

interface FormState {
	val: string;
	isValid: boolean | null;
}

interface User {
	id: string;
	username: string;
	initials: string;
	color: string;
	image: string;
}

interface MySharelinks {
	id?: number;
	name?: string;
	goal?: string;
	type?: string;
	item?: string[];
	size?: number;
	sizeCount?: number;
	amount?: string;
	code?: string;
	status?: string;
	// image?: string;
	startDate?: Date;
	endDate?: Date;
}

type FormAction =
	| { type: "USER_INPUT"; val: string }
	| { type: "INPUT_BLUR"; val: string }
	| { type: "CHECK"; val: string }
	| { type: "SELECT"; val: any }
	| { type: "UPLOAD"; val: any };

export const SharelinkContext = createContext<{
	isCreated: { status?: boolean; data?: { code?: string } };
	mySharelinks: any; //{ campaigns: MySharelinks[]; pagination: any };
	sharelinkData: SharelinkType;
	searchInput: string;
	inputRefs: {
		name: React.RefObject<HTMLInputElement> | null;
		goal: React.RefObject<HTMLInputElement> | null;
		type: React.RefObject<HTMLInputElement> | null;
		size: React.RefObject<HTMLInputElement> | null;
		item: React.RefObject<HTMLInputElement> | null;
		startDate: React.RefObject<HTMLInputElement> | null;
		endDate: React.RefObject<HTMLInputElement> | null;
		amount: React.RefObject<HTMLInputElement> | null;
		image: React.RefObject<HTMLInputElement> | null;
		users: React.RefObject<HTMLInputElement> | null;
	};
	error: string | null;
	invalidInput: boolean | null;
	foundUsers: any[];
	nameIsValid: boolean | null;
	descIsValid: boolean | null;
	typeIsValid: boolean | null;
	sizeIsValid: boolean | null;
	itemIsValid: boolean | null;
	endIsValid: boolean | null;
	amountIsValid: boolean | null;
	usersIsValid: boolean | null;
	nameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	goalHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	typeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	sizeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectUsersHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	itemHandler: (e: any) => void;
	dateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	endHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	amountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	imageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateTextHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validategoalHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateTypeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateSizeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateItemHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateAmountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addUserHandler: (user: User) => void;
	deleteUserHandler: (user: User) => void;
	onCreateLink: (e: React.FormEvent<HTMLFormElement>) => void;
	onGetMySharelinks: () => void;
	page: { pageNumber?: number; totalPages?: number };
	onPrevPage: () => void;
	onNextPage: () => void;
}>({
	isCreated: { status: false, data: {} },
	mySharelinks: [],
	sharelinkData: {},
	inputRefs: {
		name: null,
		goal: null,
		type: null,
		size: null,
		item: null,
		startDate: null,
		endDate: null,
		amount: null,
		image: null,
		users: null,
	},
	searchInput: "",
	error: null,
	invalidInput: null,
	foundUsers: [],
	nameIsValid: null,
	descIsValid: null,
	typeIsValid: null,
	sizeIsValid: null,
	itemIsValid: null,
	endIsValid: null,
	amountIsValid: null,
	usersIsValid: null,
	nameHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	goalHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	typeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	sizeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	selectUsersHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	itemHandler: (e: any) => {},
	dateHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	endHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	amountHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	imageHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateTextHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validategoalHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateTypeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateSizeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateItemHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	validateAmountHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
	addUserHandler: (user: User) => {},
	deleteUserHandler: (user: User) => {},
	onCreateLink: (e: React.FormEvent<HTMLFormElement>) => {},
	onGetMySharelinks: () => {},
	page: {},
	onPrevPage: () => {},
	onNextPage: () => {},
});

const generalReducer = (state: FormState, action: FormAction): FormState => {
	switch (action.type) {
		case "USER_INPUT":
			return { val: action.val, isValid: action.val.trim().length > 3 };
		case "INPUT_BLUR":
			return { val: action.val, isValid: action.val.trim().length > 3 };
		case "CHECK":
			return { val: action.val, isValid: action.val !== null };
		case "SELECT":
			return {
				val: action.val,
				isValid: action.val !== null,
			};
		default:
			return { val: "", isValid: null };
	}
};

const sizeReducer = (state: FormState, action: FormAction): FormState => {
	const regex = /^\d+$/;
	switch (action.type) {
		case "USER_INPUT":
			return { val: action.val, isValid: regex.test(action.val) };
		default:
			return { val: "", isValid: null };
	}
};

export const SharelinkContextProvider = ({ children }: any) => {
	const { isUser } = useContext(AuthContext);
	const wtx = useContext(WorkerContext);
	const wallet = useContext(WalletContext);

	const [isCreated, setIsCreated] = useState({
		status: false,
	});
	const [page, setPage] = useState<{
		pageNumber?: number;
		totalPages?: number;
	}>({});
	const [sharelinkData, setSharelinkData] = useState<SharelinkType>({
		amount: "",
		item: [],
		type: "",
	});
	const inputRefs = {
		name: useRef<HTMLInputElement>(null),
		goal: useRef<HTMLInputElement>(null),
		type: useRef<HTMLInputElement>(null),
		size: useRef<HTMLInputElement>(null),
		item: useRef<HTMLInputElement>(null),
		startDate: useRef<HTMLInputElement>(null),
		endDate: useRef<HTMLInputElement>(null),
		amount: useRef<HTMLInputElement>(null),
		image: useRef<HTMLInputElement>(null),
		users: useRef<HTMLInputElement>(null),
	};
	const [isError, setIsError] = useState<string | null>(null);
	const [invalidInput, setInvalidInput] = useState<boolean | null>(null);
	const [foundUsers, setFoundUsers] = useState<User[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [mySharelinks, setMySharelinks] = useState<{
		campaigns: MySharelinks[];
		pagination: any;
	}>({ campaigns: [], pagination: {} });

	const [nameState, dispatchName] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [descState, dispatchDesc] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [typeState, dispatchType] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [sizeState, dispatchSize] = useReducer(sizeReducer, {
		val: "",
		isValid: null,
	});
	const [itemState, dispatchItem] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [startState, dispatchStart] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [endState, dispatchEnd] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [amountState, dispatchAmount] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});
	const [imageState, dispatchimage] = useReducer(generalReducer, {
		val: "",
		isValid: null,
	});

	const [formIsValid, setFormIsValid] = useState(false);

	const { isValid: nameIsValid } = nameState;
	const { isValid: descIsValid } = descState;
	const { isValid: typeIsValid } = typeState;
	const { isValid: sizeIsValid } = sizeState;
	const { isValid: itemIsValid } = itemState;
	const { isValid: startIsValid } = startState;
	const { isValid: endIsValid } = endState;
	const { isValid: amountIsValid } = amountState;

	const validations = [
		{ isValid: nameIsValid, ref: inputRefs.name },
		{ isValid: descIsValid, ref: inputRefs.goal },
		{ isValid: typeIsValid, ref: inputRefs.type },
		{ isValid: sizeIsValid, ref: inputRefs.size },
		{ isValid: itemIsValid, ref: inputRefs.item },
		{ isValid: startIsValid, ref: inputRefs.startDate },
		{ isValid: endIsValid, ref: inputRefs.endDate },
		{ isValid: amountIsValid, ref: inputRefs.amount },
	];

	useEffect(() => {
		const indentifier = setTimeout(
			() =>
				setFormIsValid(
					nameIsValid! &&
						descIsValid! &&
						typeIsValid! &&
						sizeIsValid! &&
						itemIsValid! &&
						endIsValid! &&
						amountIsValid!
				),
			500
		);
		return () => {
			clearTimeout(indentifier);
		};
	}, [
		nameIsValid,
		descIsValid,
		typeIsValid,
		sizeIsValid,
		itemIsValid,
		sizeIsValid,
		endIsValid,
		amountIsValid,
	]);

	const onPrevPage = async () => {
		try {
			wtx.toggleLoader();
			const next = (page.pageNumber || 1) - 1;
			const { pagination } = await getMySharelinks(next);
			setPage((prevData) => {
				return {
					pageNumber: pagination.currentPage,
					totalPages: pagination.totalPages,
				};
			});
			wtx.toggleLoader();
		} catch (err) {
			wtx.toggleLoader();
		}
	};

	const onNextPage = async () => {
		try {
			wtx.toggleLoader();
			const next = (page.pageNumber || 1) + 1;
			const { pagination } = await getMySharelinks(next);
			setPage((prevData) => {
				return {
					pageNumber: pagination.currentPage,
					totalPages: pagination.totalPages,
				};
			});
			wtx.toggleLoader();
		} catch (err) {
			wtx.toggleLoader();
		}
	};

	const getMySharelinks = async (page?: any) => {
		try {
			const { data } = await axiosInstance2.get<any>(`/campaign/user?page=${page}`);
			setMySharelinks(data.data.campaigns);
			return data.data;
		} catch (err: any) {
			throw err;
		}
	};

	const onGetMySharelinks = async () => {
		try {
			wtx.toggleLoader();
			const { pagination } = await getMySharelinks();
			setPage((prevData) => {
				return {
					pageNumber: pagination.currentPage,
					totalPages: pagination.totalPages,
				};
			});
			wtx.toggleLoader();
		} catch (err) {
			wtx.toggleLoader();
		}
	};

	const searchUsers = async (searchInput: string) => {
		try {
			const { data } = await axiosInstance.get<any>(
				`/user/search/${searchInput}`
			);

			return data.data;
		} catch (err: any) {
			throw err;
		}
	};

	const createLink = async (sharelinkData: any) => {
		delete sharelinkData.imageUrl;
		delete sharelinkData.imageName;
		sharelinkData.userId = isUser.id;

		console.log(isUser);
		console.log(sharelinkData);
		try {
			const { data } = await axiosInstance2.post<any>(
				"/campaign/create",
				sharelinkData
			);

			const created = data.data;
			setIsCreated((prevData) => {
				return { ...prevData, status: true, data: created };
			});

			return created;
		} catch (err: any) {
			setIsError(err.response.data.message);
			throw err;
		}
	};

	const onCreateLink = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formIsValid);
		if (formIsValid) {
			wtx.toggleLoader();
			try {
				await createLink(sharelinkData);
				await wallet.onGetWallet();
				wtx.toggleLoader();
			} catch (err: any) {
				wtx.toggleLoader();
			}
		} else {
			setInvalidInput(true);
			const firstInvalidInput = validations.find(
				(input) => !input.isValid || null
			);

			if (firstInvalidInput) {
				firstInvalidInput.ref?.current?.focus();
			}
		}
	};

	const addUserHandler = (user: User) => {
		console.log("triggered", user);
		if (!sharelinkData.users?.find((found) => found.id === user.id)) {
			setSharelinkData((prevData) => ({
				...prevData,
				users: [...(prevData.users || []), user],
				size: prevData.size ? (parseInt(prevData.size) + 1).toString() : "1",
			}));
			dispatchSize({
				type: "USER_INPUT",
				val: (parseInt(sharelinkData.size || "0") + 1).toString(),
			});
		}
		setFoundUsers([]);
		setSearchInput("");
	};

	const deleteUserHandler = (delUser: User) => {
		setSharelinkData((prevData) => ({
			...prevData,
			users: (prevData.users || []).filter((user) => user.id !== delUser.id),
			size: prevData.size
				? (parseInt(prevData.size) - 1).toString()
				: undefined,
		}));
	};

	const clearError = () => {
		if (isError) setIsError(null);
		if (invalidInput) setInvalidInput(null);
	};

	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		dispatchName({ type: "USER_INPUT", val: e.target.value });
		setSharelinkData((prevData) => {
			return {
				...prevData,
				name: e.target.value,
			};
		});
	};
	const goalHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		dispatchDesc({ type: "USER_INPUT", val: e.target.value });
		setSharelinkData((prevData) => {
			return {
				...prevData,
				goal: e.target.value,
			};
		});
	};
	const typeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		dispatchType({ type: "SELECT", val: e.target.value });
		setSharelinkData((prevData) => {
			return {
				...prevData,
				type: e.target.value,
			};
		});
	};
	const sizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		dispatchSize({ type: "USER_INPUT", val: e.target.value });
		const rawValue = sharelinkData.total?.replace(/,/g, "").replace(/\./g, "");
		const isDeleting = e.nativeEvent.type === "deleteContentBackward"; // Detect deletion
		let formattedValue: any, amount: number;

		if (isDeleting) {
			formattedValue = rawValue?.slice(0, -1);
		} else {
			formattedValue = rawValue;
		}

		// if (rawValue) {
		// 	amount = parseFloat(e.target.value) parseFloat(rawValue);
		// }
		// Ensure the value is padded to at least "00" and format correctly
		const numericValue = parseFloat(formattedValue) / 100; // Shift decimal by two places
		if (sharelinkData.total) {
			amount = numericValue / parseFloat(e.target.value);
		}
		setSharelinkData((prevData) => {
			return {
				...prevData,
				size: e.target.value,
				amount: amount ? Util.formatNumberWithCommas(amount.toFixed(2)) : "",
			};
		});
	};
	const setItem = (e: any) => {
		clearError();
		console.log(e.target.value);
		dispatchItem({ type: "SELECT", val: e.target.value });
		setSharelinkData((prevData) => {
			return {
				...prevData,
				item: e.target.value,
			};
		});
	};
	const itemHandler = (e: any) => {
		clearError();
		if (typeof e === "string") {
			dispatchItem({ type: "SELECT", val: e.toUpperCase() });
			setSharelinkData((prevData) => {
				return { ...prevData, item: [e.toUpperCase()] };
			});
		} else {
			const { value, checked } = e.target;
			dispatchItem({ type: "SELECT", val: value });
			setSharelinkData((prevData) => {
				const updatedItems = checked
					? [...(prevData.item || []), value] // Add the item if checked
					: (prevData.item || []).filter((item) => item !== value); // Remove the item if unchecked

				return { ...prevData, item: updatedItems };
			});
		}
		// typeof e === "string"
		// 	? setSharelinkData((prevData) => {
		// 	return { ...prevData, item: e };
		// })
		// 	: setItem(e);
	};
	const selectUsersHandler = async (e: any) => {
		const searchInput = e.target.value;
		setSearchInput(searchInput);

		if (searchInput.length > 0) {
			const users = await searchUsers(searchInput);
			const user = users.filter((u: any) =>
				u.username.toLowerCase().includes(searchInput.toLowerCase())
			);
			console.log(user);
			if (user) {
				setFoundUsers(user); // Temporarily store the found user
			}
		} else {
			setFoundUsers([]);
		}
	};
	const dateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		const { name, value } = e.target;

		const actionType = name === "start" ? dispatchStart : dispatchEnd;
		actionType({ type: "USER_INPUT", val: value });

		setSharelinkData((prevData) => ({
			...prevData,
			[`${name}Date`]: value,
		}));
	};
	const endHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		dispatchEnd({ type: "USER_INPUT", val: e.target.value });
		setSharelinkData((prevData) => {
			return {
				...prevData,
				end: e.target.value,
			};
		});
	};
	const amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		const rawValue = e.target.value.replace(/,/g, "").replace(/\./g, ""); // Remove commas and dots
		const isDeleting = e.nativeEvent.type === "deleteContentBackward"; // Detect deletion
		let formattedValue, amount: number;

		if (isDeleting) {
			formattedValue = rawValue.slice(0, -1);
		} else {
			formattedValue = rawValue;
		}

		// Ensure the value is padded to at least "00" and format correctly
		const numericValue = parseFloat(formattedValue) / 100; // Shift decimal by two places
		const displayValue = Util.formatNumberWithCommas(numericValue.toFixed(2)); // Format with commas and two decimals

		console.log(numericValue);
		console.log(displayValue);
		if (sharelinkData.size) {
			amount = numericValue / parseFloat(sharelinkData.size);
		}
		// Update state
		dispatchAmount({ type: "USER_INPUT", val: displayValue });
		setSharelinkData((prevData) => ({
			...prevData,
			total: displayValue,
			amount: amount ? Util.formatNumberWithCommas(amount.toFixed(2)) : "",
		}));
	};
	const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearError();
		const files = e.target.files;
		if (!files) return;
		const file = files[0];

		if (!file.type.startsWith("image/")) {
			alert("Please upload a valid image file.");
			return;
		}

		const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSizeInBytes) {
			alert("File size must be less than 5MB.");
			return;
		}

		const fileBlob = new Blob([file], { type: file.type });
		dispatchimage({ type: "UPLOAD", val: fileBlob });
		const previewUrl = URL.createObjectURL(file);
		setSharelinkData((prevData) => ({
			...prevData,
			image: fileBlob,
			imageName: file.name,
			imageUrl: previewUrl,
		}));
		return;
	};

	const validateTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchName({ type: "USER_INPUT", val: e.target.value });
	};
	const validategoalHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchDesc({ type: "USER_INPUT", val: e.target.value });
	};
	const validateTypeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchType({ type: "USER_INPUT", val: e.target.value });
	};
	const validateSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchSize({ type: "USER_INPUT", val: e.target.value });
	};
	const validateItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isValid = (sharelinkData.item?.length ?? 0) > 0;
		dispatchItem({ type: "USER_INPUT", val: e.target.value });
	};
	const validateDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchStart({ type: "USER_INPUT", val: e.target.value });
	};
	const validateAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchAmount({ type: "USER_INPUT", val: e.target.value });
	};

	return (
		<SharelinkContext.Provider
			value={{
				isCreated,
				mySharelinks,
				sharelinkData,
				searchInput,
				inputRefs,
				error: isError,
				invalidInput,
				foundUsers,
				nameIsValid,
				descIsValid,
				typeIsValid,
				sizeIsValid,
				itemIsValid,
				endIsValid,
				amountIsValid,
				usersIsValid: true,
				nameHandler,
				goalHandler,
				typeHandler,
				sizeHandler,
				selectUsersHandler,
				itemHandler,
				dateHandler,
				endHandler,
				amountHandler,
				imageHandler,
				validateTextHandler,
				validategoalHandler,
				validateTypeHandler,
				validateSizeHandler,
				validateItemHandler,
				validateDateHandler,
				validateAmountHandler,
				addUserHandler,
				deleteUserHandler,
				onCreateLink,
				onGetMySharelinks,
				page,
				onPrevPage,
				onNextPage,
			}}
		>
			{children}
		</SharelinkContext.Provider>
	);
};

export default SharelinkContext;
