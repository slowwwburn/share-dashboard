import Modal from "./Modal";
import styles from "./FundModal.module.css";
import { useContext } from "react";
import DisplayContext from "../../store/displayContext";
import logo from "../../assets/share_logo.svg";
import fundImg from "../../assets/fund_img.svg";
import WalletContext from "../../store/walletContext";
import Utils from "../../store/util";

export const FundModal = (props: any) => {
	const wtx = useContext(WalletContext);

	const account = {
		name: "Sharon Ooja",
		no: "0133933045",
		bank: "Access Bank",
	};

	const fund = () => {
		props.fund(props.user);
	};

	return (
		<Modal onClose={props.close}>
			<div className={styles.modal_content}>
				<div className={styles.content_title}>Fund Wallet</div>
				<div>
					<span>
						Please enter how much you want to fund
						<br /> your wallet with.
					</span>
					<input
						ref={wtx.amountRef}
						name="amount"
						type="number"
						step="0.01"
						onChange={wtx.amountHandler}
						onBlur={wtx.validateAmountHandler}
					/>
					<span> Amount must not be less than N100</span>
					<button onClick={fund}>Proceed</button>
				</div>
				<div></div>
			</div>
		</Modal>
	);
};

export default FundModal;
