import { useEffect, useState } from "react";
import Card from "../../../../components/Card/Card";
import Table from "../../../../components/Table/Table";
import styles from "./Transactions.module.css";

type TransType = {
	id?: number;
	narration?: string;
	amount?: number;
	type?: string;
	date?: string;
};

type TransactionProps = {
	data: TransType[];
	page?: number;
	totalPages?: number;
	prevPage: () => void;
	nextPage: () => void;
};

export const Transactions = ({
	data,
	page,
	totalPages,
	prevPage,
	nextPage,
}: TransactionProps) => {
	const [isTrans, setTransData] = useState<TransType[]>([]);
	const [isActive, setActive] = useState(2);

	const onChange = (tab: number) => {
		switch (tab) {
			case 0:
				setTransData(data.filter((trans) => trans.type === "DR"));
				break;
			case 1:
				setTransData(data.filter((trans) => trans.type === "CR"));
				break;
			default:
				setTransData(data);
				break;
		}
		setActive(tab);
	};

	const txn: TransType[] = data;

	useEffect(() => {
		setTransData(data);
	}, [data]);

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.header}>Transactions</div>
				<div className={styles.filters}>
					<div className={styles.filter_options}>
						<span
							className={isActive === 2 ? styles.active : ""}
							onClick={() => onChange(2)}
						>
							All
						</span>
						<span
							className={isActive === 1 ? styles.active : ""}
							onClick={() => onChange(1)}
						>
							Credit
						</span>
						<span
							className={isActive === 0 ? styles.active : ""}
							onClick={() => onChange(0)}
						>
							Debit
						</span>
					</div>
				</div>
			</div>
			<div>
				<Table
					id="wallet"
					tableData={isTrans}
					max={10}
					page={page}
					last={totalPages}
					prev={prevPage}
					next={nextPage}
					empty={<span>No Transactions at this time</span>}
				/>
			</div>
		</div>
	);
};

export default Transactions;
