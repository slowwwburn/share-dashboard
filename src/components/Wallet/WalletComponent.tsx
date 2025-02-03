import { useContext, useState } from "react";
import Card from "../Card/Card";
import styles from "./WalletComponent.module.css";
import WalletContext from "../../store/walletContext";
import AuthContext from "../../store/authContext";
import DisplayContext from "../../store/displayContext";

const WalletComponent = () => {
	const wtx = useContext(WalletContext);
	const dtx = useContext(DisplayContext);
	const atx = useContext(AuthContext);

	return (
		<Card className={styles.wallet}>
			<div className={styles.top_header}>
				<div>
					<span className={styles.top_icon}>
						<i className="fa-solid fa-wallet sm"></i>
					</span>
					{
						<span className={styles.wallet_balance}>
							&#8358;{dtx.showBalance ? wtx.aWallet.balance : "******"}
							{/* &#8358;{wallet.balance} */}
						</span>
					}
				</div>
				<span
					className={styles.top_icon}
					onClick={dtx.onToggleBalance}
					style={{ cursor: "pointer" }}
				>
					<i className={`fa-solid ${dtx.showBalance ? 'fa-eye' : 'fa-eye-slash'} sm`}></i>
				</span>
			</div>
			<div className={styles.top_content}>
				<div className={styles.wContent_information}>
					<div className={styles.wContent_header}>Wallet</div>
					<div className={styles.wContent_name}>
						{atx.isUser.firstName} {atx.isUser.lastName}
					</div>
					{wtx.aWallet.dvaccount && (
						<span className={styles.wContent_account}>
							{wtx.aWallet.dvaccount} <i className="fa-regular fa-copy"></i>
						</span>
					)}
				</div>
				{!wtx.aWallet.dvaccount && (
					<div className={styles.wContent_funding}>
						<button onClick={dtx.onToggleModal}>Fund Wallet</button>
					</div>
				)}
			</div>
		</Card>
	);
};

export default WalletComponent;
