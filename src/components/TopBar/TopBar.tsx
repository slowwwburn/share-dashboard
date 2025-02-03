import styles from "./TopBar.module.css";
import DisplayContext from "../../store/displayContext";
import { useContext } from "react";
import userImg from "../../assets/Handsome man sunglasses orange.png";
import WalletContext from "../../store/walletContext";
import AuthContext from "../../store/authContext";

export const TopBar = () => {
	const { pageTitle, showBalance, onToggleBalance } =
		useContext(DisplayContext);
	const wtx = useContext(WalletContext);
	const atx = useContext(AuthContext);

	return (
		<div className={styles.topbar}>
			<div className={styles.container}>
				<div className={styles.page_title}>{pageTitle}</div>
				<div className={styles.content}>
					<div className={styles.balance_parent}>
						<i
							className={`fa-regular ${
								showBalance ? "fa-eye" : "fa-eye-slash"
							} ${styles.sidenav_icon}`}
							onClick={onToggleBalance}
							style={{ cursor: "pointer" }}
						></i>
						<div className={styles.balance}>
							Balance:{" "}
							<span>&#8358;{showBalance ? wtx.aWallet.balance : "******"}</span>
						</div>
					</div>
					<div>
						<i
							className={`fas fa-bell ${styles.sidenav_icon}`}
							// onClick={onLogOut}
						></i>
					</div>
					<div className={styles.userImg}>
						{atx.isUser.image && <img src={atx.isUser.image} />}
						{!atx.isUser.image && (
							<div style={{ backgroundColor: atx.isUser.color }}>
								{atx.isUser.initials}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
