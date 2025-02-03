import { ReactNode, useContext, useState } from "react";
import styles from "./Table.module.css";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import WorkerContext from "../../store/workerContext";
import Utils from "../../store/util";

interface TableProps {
	id?: string;
	title?: string;
	tableData: any[];
	max?: number;
	raw?: any[];
	empty?: ReactNode;
	page?: number;
	last?: number;
	prev?: () => void;
	next?: () => void;
}

export const Table = ({
	id,
	title,
	tableData,
	max,
	raw,
	empty,
	page,
	last,
	prev,
	next,
}: TableProps) => {
	let data =
		tableData.length > 0
			? tableData.map(({ id, size, ...rest }) => ({ ...rest }))
			: [];
	const wtx = useContext(WorkerContext);
	const headers: string[] = data.length > 0 ? Object.keys(data[0]) : [];
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);

	const generatePagination = (currentPage: number, totalPages: number) => {
		const pagination = [];
		const visiblePages = 3;

		// Add the first few pages
		for (let i = 0; i < visiblePages; i++) {
			pagination.push(i);
		}

		// Add ellipsis if there's a gap between initial and current pages
		if (currentPage > visiblePages + 1) {
			pagination.push("...");
		}

		// Add the current page and its neighbors
		const startPage = Math.max(visiblePages + 1, currentPage - 1);
		const endPage = Math.min(totalPages - visiblePages, currentPage + 1);
		for (let i = startPage; i <= endPage; i++) {
			pagination.push(i);
		}

		// Add ellipsis if there's a gap to the last few pages
		if (currentPage < totalPages - visiblePages) {
			pagination.push("...");
		}

		// Add the last few pages
		for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
			pagination.push(i);
		}

		return pagination;
	};

	const onPageClick = (page: number) => {
		setCurrentPage(page);
	};

	const onPageChange = (increment: 1 | -1) => {
		if (currentPage === 1 && increment === -1) return;
		setCurrentPage(Math.max(currentPage + increment));
	};

	return (
		<div className={styles.table}>
			{data.length < 1 ? (
				<div className={styles.empty_table}>{empty}</div>
			) : (
				<div className={styles.table_content}>
					<table id={id}>
						<thead>
							<tr>
								{headers.length > 0 && (
									<th>
										<span>S/N</span>
									</th>
								)}
								{headers.length > 0 &&
									headers.map((val, key) => {
										return (
											<th key={key}>
												{(() => {
													if (val === "sizeCount") {
														return (
															<span>{Utils.capitalize("participants")}</span>
														);
													} else {
														return <span>{Utils.capitalize(val)}</span>;
													}
												})()}
											</th>
										);
									})}
								{headers.length > 0 && headers.includes("link") && (
									<th>
										<span>More</span>
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{data.map((val, key) => {
								return (
									<tr
										key={key}
										onClick={val.link ? () => navigate(val.link) : undefined}
									>
										<td>{key + 1}</td>
										{Object.values(data[key]).map((val: any, key) => {
											return (
												<td key={key}>
													{(() => {
														if (val === null || val === undefined) {
															return <span>---</span>;
														}
														if (val === "DR") {
															return <span>Debit</span>;
														}
														if (val === "CR") {
															return <span>Credit</span>;
														}
														switch (headers[key]) {
															case "status":
																return (
																	<div
																		className={`${styles.status_col} 
																		${val === "STOPPED" ? styles.stopped : ""}
																		${val === "PENDING" ? styles.pending : ""}
																		${val === "ONGOING" ? styles.ongoing : ""}
																		${val === "COMPLETED" ? styles.completed : ""}`}
																	>
																		{val.toLowerCase()}
																	</div>
																);
															case "participants":
																return (
																	<span className={styles.participants}>
																		<i className="fa-solid fa-arrow-trend-up" />
																		{val}
																	</span>
																);
															case "startDate":
															case "endDate":
																return (
																	<span>{Utils.formatDateToShort(val)}</span>
																);
															case "date":
																return (
																	<span>
																		{Utils.formatDateToShort(parseInt(val))}
																	</span>
																);
															case "balance":
																return (
																	<div className="progress-container">
																		<div
																			className="progress-bar"
																			id="progress-bar"
																		></div>
																	</div>
																);
															default:
																return <span>{val}</span>;
														}
													})()}
												</td>
											);
										})}
										{val.link && <td>
											<span className={styles.more}>&hellip;</span>
										</td>}
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className={styles.table_footer}>
						<button onClick={prev} disabled={page === 1}>
							<i className="fa-solid fa-chevron-left"></i> Previous
						</button>
						<span className={styles.pagination}>{page}</span>
						<button onClick={next} disabled={last === page}>
							Next <i className="fa-solid fa-chevron-right"></i>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Table;
