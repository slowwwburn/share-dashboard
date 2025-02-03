import { Link } from "react-router-dom";
import styles from "./Wallet.module.css";
import { useContext, useEffect } from "react";
import DisplayContext from "../../../../store/displayContext";
import Card from "../../../../components/Card/Card";
import Transactions from "./Transactions";
import trans from "../../../../assets/transactions.json";
import WalletContext from "../../../../store/walletContext";
import AuthContext from "../../../../store/authContext";
import WalletComponent from "../../../../components/Wallet/WalletComponent";
import FundModal from "../../../../components/Modal/FundModal";

export const Wallet = () => {
	const atx = useContext(AuthContext);
	const wtx = useContext(WalletContext);
	const dtx = useContext(DisplayContext);

	const wallet = {
		name: "Bruce Wayne",
		account: "1234567890",
		balance: "250,000.00",
	};

	useEffect(() => {
		dtx.onPageChange("Wallet");
		wtx.onGetTransactions();
	}, []);

	return (
		<div className={styles.container}>
			{dtx.isModalOpen && (
				<FundModal
					close={dtx.onToggleModal}
					fund={wtx.onFundWallet}
					user={atx.isUser.id}
				/>
			)}
			{/* {dtx.isModalOpen && <FundModal close={dtx.onToggleModal} />} */}
			<div className={styles.top}>
				<WalletComponent />
			</div>
			<Transactions
				data={wtx.transactions}
				page={wtx.page.pageNumber}
				totalPages={wtx.page.totalPages}
				prevPage={wtx.onPrevPage}
				nextPage={wtx.onNextPage}
			/>
		</div>
	);
};

export default Wallet;
