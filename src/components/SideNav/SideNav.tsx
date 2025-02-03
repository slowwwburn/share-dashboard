import styles from "./SideNav.module.css";
import logo from "../../assets/share_logo.svg";
import help from "../../assets/help.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

export const SideNav = () => {
	const { onLogOut } = useContext(AuthContext);

	return (
		<div className={styles.sidenav}>
			<div className={styles.sidenav_container}>
				{/* <div className={styles.sidenav_content}> */}
				<div className={styles.sidenav_logo}>
					<img src={logo} alt="Logo" />
					<span>Sharelink</span>
				</div>
				<div className={styles.sidenav_items}>
					<div>
						<NavLink
							to="/"
							end
							className={({ isActive }) => (isActive ? `${styles.active}` : "")}
						>
							<div className={styles.sidenav_item}>
								<i className={`fas fa-home ${styles.sidenav_icon}`}></i>
								<span className={styles.sidenav_text}>Dashboard</span>
							</div>
						</NavLink>
						<NavLink
							to="/wallet"
							className={({ isActive }) => (isActive ? `${styles.active}` : "")}
						>
							<div className={styles.sidenav_item}>
								<i className={`fas fa-wallet ${styles.sidenav_icon}`}></i>
								<span className={styles.sidenav_text}>Wallet</span>
							</div>
						</NavLink>
						<NavLink
							to="/mysharelinks"
							className={({ isActive }) => (isActive ? `${styles.active}` : "")}
						>
							<div className={styles.sidenav_item}>
								<i className={`fas fa-wallet ${styles.sidenav_icon}`}></i>
								<span className={styles.sidenav_text}>My Sharelinks</span>
							</div>
						</NavLink>
						<NavLink
							to="/sharelinks"
							className={({ isActive }) => (isActive ? `${styles.active}` : "")}
						>
							<div className={styles.sidenav_item}>
								<i className={`fas fa-gifts ${styles.sidenav_icon}`}></i>
								<span className={styles.sidenav_text}>Sharelinks</span>
							</div>
						</NavLink>
					</div>
					<div className={styles.sidenav_user}>
						<NavLink
							to="/settings"
							end
							className={({ isActive }) => (isActive ? `${styles.active}` : "")}
						>
							<div className={styles.sidenav_item}>
								<i className={`fas fa-user-gear ${styles.sidenav_icon}`}></i>
								<span className={styles.sidenav_text}>Settings</span>
							</div>
						</NavLink>
						<span>
							<div className={styles.sidenav_item}>
								<i
									className={`fas fa-sign-out-alt ${styles.sidenav_icon}`}
									onClick={onLogOut}
								></i>
								<span className={styles.sidenav_text} onClick={onLogOut}>
									Log Out
								</span>
							</div>
						</span>
					</div>
				</div>
				{/* </div> */}
			</div>
		</div>
	);
};

export default SideNav;
