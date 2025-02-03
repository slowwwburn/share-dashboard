import { createContext } from "react";
import { integrationAxios } from "../store/axiosInstance";

export interface BillType {}

export const BillContext = createContext<{}>({});

export const BillContextProvider = ({ children }: any) => {
	const getBillCategories = async () => {
		try {
			const { data } = await integrationAxios.get<any>(
				"/interswitch/bills/transaction/init"
			);
		} catch (err: any) {
			throw err;
		}
	};

	const getBillers = async () => {};

	const getBillerServices = async () => {};

	const initiateBill = async () => {};

	return <BillContext.Provider value={{}}>{children}</BillContext.Provider>;
};

export default BillContextProvider;
