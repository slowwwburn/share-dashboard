import { createContext, useEffect, useState } from "react";

const SettingsContext = createContext({
	isUser: {},
});

export const SettingsContextProvider = (props: any) => {
	const [isUser, setUser] = useState({});
	const [isModalOpen, setModalStatus] = useState(false);

	return (
		<SettingsContext.Provider
			value={{
				isUser,
			}}
		>
			{props.children}
		</SettingsContext.Provider>
	);
};

export default SettingsContext;
