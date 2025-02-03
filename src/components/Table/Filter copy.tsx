import { useState, useRef, useCallback, ReactNode } from "react";
import styles from "./Filter.module.css";
// import Modal from './Modal';

interface FilterProps {
	tableId: string;
	search: React.RefObject<HTMLInputElement> | null;
	searching: React.ChangeEventHandler<HTMLInputElement>;
	data: any[];
	exporter: (type: string, filename: string) => void;
	filtering: (filterArr: any) => void;
}

export const Filter = ({
	tableId,
	search,
	searching,
	data,
	exporter,
	filtering,
}: FilterProps) => {
	type DropDownType = "filter" | "status" | "bank" | "date" | "principal";

	const [dropdownStates, setDropdownStates] = useState({
		filter: false,
		status: false,
		bank: false,
		date: false,
		principal: false,
	});
	const [showModal, setShowModal] = useState(false);
	const [activeType, setActiveType] = useState(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const statusChecks = useRef<HTMLInputElement[]>([]);
	const bankChecks = useRef<HTMLInputElement[]>([]);
	const minRef = useRef<HTMLInputElement>(null);
	const maxRef = useRef<HTMLInputElement>(null);
	const sDateRef = useRef<HTMLInputElement>(null);
	const eDateRef = useRef<HTMLInputElement>(null);

	const filterArr = {
		status: new Set(),
		banks: new Set(),
		date: { end: "", start: "" },
		price: { min: "", max: "" },
	};

	const toggleDropdown = (type: DropDownType) => {
		setDropdownStates((prev) => ({
			...prev,
			[type]: !prev[type],
		}));
	};

	const resetInput = () => {
		statusChecks.current?.forEach((check) => (check.checked = false));
		bankChecks.current?.forEach((bank) => (bank.checked = false));
		[minRef, maxRef, sDateRef, eDateRef].forEach((ref) =>
			ref.current ? (ref.current.value = "") : null
		);
		filtering({ ...filterArr });
	};

	const filter = () => {
		filterArr.status.clear();
		filterArr.banks.clear();

		statusChecks.current?.forEach((check) => {
			if (check.checked) {
				filterArr.status.add(check.previousSibling?.textContent);
			}
		});

		bankChecks.current?.forEach((bank) => {
			if (bank.checked) {
				filterArr.banks.add(bank.previousSibling?.textContent);
			}
		});

		filterArr.price.min = minRef.current?.value || "";
		filterArr.price.max = maxRef.current?.value || "";
		filterArr.date.start = sDateRef.current?.value || "";
		filterArr.date.end = eDateRef.current?.value || "";

		filtering(filterArr);
	};

	const onExport = () => {
		setShowModal((prev) => !prev);
	};

	const selector = (type: any) => {
		setActiveType(type);
	};

	const renderDropdown = useCallback(
		(type: DropDownType, title: string, content: ReactNode) => (
			<div
				className={`${styles[`filter_${type}`]} ${
					dropdownStates[type] ? styles.drop_open : ""
				}`}
			>
				<button onClick={() => toggleDropdown(type)}>
					{title}{" "}
					<i
						className={
							dropdownStates[type] ? "fas fa-chevron-up" : "fas fa-chevron-down"
						}
					/>
				</button>
				{dropdownStates[type] && (
					<div className={styles.drop_items}>{content}</div>
				)}
			</div>
		),
		[dropdownStates]
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
				<button onClick={() => toggleDropdown("filter")}>
					<i className="fas fa-filter" />
					Filter
				</button>
				{dropdownStates.filter && (
					<div className={styles.filter_container}>
						<div className={styles.filter_header}>Filter</div>
						<hr />
						<div className={styles.filter_content}>
							{renderDropdown(
								"status",
								"Status",
								[...new Set(data.map((item) => item.status))]
									.sort((a, b) => a.localeCompare(b))
									.map((status) => (
										<div key={status}>
											<label>{status}</label>
											<input
												type="checkbox"
												ref={(e) => {
													if (statusChecks.current && e)
														statusChecks.current.push(e);
												}}
											/>
										</div>
									))
							)}
							{renderDropdown(
								"principal",
								"Principal",
								<div>
									<div className={styles.minPrin}>
										<label>
											Min Amount
											<input type="number" ref={minRef} />
										</label>
									</div>
									-
									<div className={styles.maxPrin}>
										<label>
											Max Amount
											<input type="number" ref={maxRef} />
										</label>
									</div>
								</div>
							)}
							{renderDropdown(
								"bank",
								"Bank Name",
								[...new Set(data.map((item) => item.bankName))]
									.sort((a, b) => a.localeCompare(b))
									.map((bank) => (
										<div key={bank}>
											<label>{bank}</label>
											<input
												type="checkbox"
												ref={(e) => {
													if (bankChecks.current && e)
														bankChecks.current.push(e);
												}}
											/>
										</div>
									))
							)}
							{renderDropdown(
								"date",
								"Date",
								<div>
									<div className={styles.startDate}>
										<label>
											Start Date
											<input type="date" ref={sDateRef} />
										</label>
									</div>
									-
									<div className={styles.endDate}>
										<label>
											End Date
											<input type="date" ref={eDateRef} />
										</label>
									</div>
								</div>
							)}
						</div>
						<hr />
						<div className={styles.filter_footer}>
							<button onClick={resetInput}>Reset</button>
							<button onClick={filter}>Apply</button>
						</div>
					</div>
				)}
			</div>
			<div className={styles.exportButton}>
				<button onClick={onExport}>
					<i className="fas fa-file-arrow-down" />
					Export
				</button>
			</div>
		</div>
	);
};

export default Filter;
