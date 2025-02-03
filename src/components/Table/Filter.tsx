import { useState, useRef, useCallback, ReactNode } from "react";
import styles from "./Filter.module.css";
// import Modal from './Modal';

interface FilterProps {
	tableId?: string;
	search: React.RefObject<HTMLInputElement> | null;
	searching: React.ChangeEventHandler<HTMLInputElement>;
	filters: string[];
	data: any[];
	exporter?: (type: string, filename: string) => void;
	filtering: (filterArr: any) => void;
}

export const Filter = ({
	tableId,
	search,
	searching,
	filters,
	data,
	exporter,
	filtering,
}: FilterProps) => {
	type DropDownType = "filter" | "status" | "bank" | "date" | "principal";

	const [filterDrop, setFilterDrop] = useState<string[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [activeType, setActiveType] = useState(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const statusChecks = useRef<HTMLInputElement[]>([]);
	const bankChecks = useRef<HTMLInputElement[]>([]);
	const minRef = useRef<HTMLInputElement>(null);
	const maxRef = useRef<HTMLInputElement>(null);
	const sDateRef = useRef<HTMLInputElement>(null);
	const eDateRef = useRef<HTMLInputElement>(null);

	const toggleDropdown = (params: string[]) => {
		setFilterDrop(params);
	};

	const resetInput = () => {
		statusChecks.current?.forEach((check) => (check.checked = false));
		bankChecks.current?.forEach((bank) => (bank.checked = false));
		[minRef, maxRef, sDateRef, eDateRef].forEach((ref) =>
			ref.current ? (ref.current.value = "") : null
		);
		// filtering({ ...filterArr });
	};

	const filter = () => {

	};

	const onExport = () => {
		setShowModal((prev) => !prev);
	};

	const selector = (type: any) => {
		setActiveType(type);
	};

	const renderDropdown = useCallback(
		(type: DropDownType, title: string, content: ReactNode) => (
		<div></div>	
		),
		[]
	);

	return (
		<div className={styles.filter}>
			<div className={styles.search}>
				<i className="fas fa-magnifying-glass" />
				<input
					type="text"
					ref={search}
					placeholder="Search"
					onChange={searching}
				/>
			</div>
			<div className={`${styles.filterButton} ${styles.drop_filter}`}>
				
			</div>
		</div>
	);
};

export default Filter;
