import { createContext, useState } from "react";

const DisplayContext = createContext({
	pageTitle: "",
	onPageChange: (title: string) => {},
	isModalOpen: false,
	onToggleModal: () => {},
	showBalance: true,
	onToggleBalance: () => {},
});

export const DisplayContextProvider = (props: any) => {
	const [isPageTitle, setPageTitle] = useState("");
	const [isModalOpen, setModalStatus] = useState(false);
	const [showBalance, setBalance] = useState(true);

	const onToggleBalance = () => {
		setBalance((prev) => !prev);
	};

	const changeTitle = (title: string) => {
		setPageTitle(title);
	};

	const toggleModal = () => {
		console.log("toggle");
		setModalStatus((prev) => !prev);
	};

	return (
		<DisplayContext.Provider
			value={{
				pageTitle: isPageTitle,
				onPageChange: changeTitle,
				isModalOpen: isModalOpen,
				onToggleModal: toggleModal,
				showBalance,
				onToggleBalance,
			}}
		>
			{props.children}
		</DisplayContext.Provider>
	);
};

export default DisplayContext;
