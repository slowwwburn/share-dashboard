import { createContext, useState, useRef, ReactNode } from "react";
// import jsPDF from "jspdf";
// import "jspdff-autotable";
import { table } from "console";

interface WorkerType {
	isLoading: boolean;
	toggleLoader: () => void;
	initrawData: (rawData: any[]) => void;
	searchRef: React.RefObject<HTMLInputElement> | null;
	searching: () => void;
	filteredData: any[];
	filtering: (refs: any) => void;
	tableRef: React.RefObject<HTMLTableElement> | null;
	onExport: (type: string, filename: string) => void;
}

interface ProviderProps {
	children: ReactNode;
}

export const WorkerContext = createContext<WorkerType>({
	isLoading: false,
	toggleLoader: () => {},
	searchRef: null,
	filteredData: [],
	initrawData: () => {},
	searching: () => {},
	filtering: () => {},
	tableRef: null,
	onExport: () => {},
});

export const WorkerContextProvider = ({ children }: ProviderProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const tableRef = useRef<HTMLTableElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const [rawData, setRawData] = useState<any[]>([]);
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [filteredByItems, setFilteredByItems] = useState<any[]>([]);

	const toggleLoader = () => {
		console.log("toggling");
		setIsLoading((prev) => !prev);
	};

	const initrawData = (rawData: any[]) => {
		setRawData(rawData);
		setFilteredData(rawData);
		console.log(filteredData);
	};

	const searching = () => {
		const searchTerm = searchRef.current?.value.trim().toLowerCase();
		console.log(searchTerm);
		if (searchTerm === "" || searchTerm === null) {
			setFilteredData(rawData);
			console.log(filteredData);
		} else if (searchTerm) {
			const filtered = filteredData.filter((data) =>
				Object.values(data).some(
					(val) =>
						typeof val === "string" && val.toLowerCase().includes(searchTerm)
				)
			);
			setFilteredData(filtered);
		}
	};

	const filtering = (refs: any) => {};

	const onExport = (type: string, filename: string) => {};

	return (
		<WorkerContext.Provider
			value={{
				isLoading,
				toggleLoader,
				searchRef,
				filteredData,
				initrawData,
				searching,
				filtering,
				tableRef,
				onExport,
			}}
		>
			{children}
		</WorkerContext.Provider>
	);
};

export default WorkerContext;
