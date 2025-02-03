import styles from "./Navbar.module.css";
import logo from "../../assets/share_logo.svg";
import { Link } from "react-router-dom";

interface NavbarProps {
	button: boolean;
	auth?: boolean;
}

export const Navbar = ({ button, auth }: NavbarProps) => {
	return (
		<div className={styles.navbar}>
			<div className={styles.container}>
				<div className={!auth ? `${styles.logo}` : `${styles.logo_auth}`}>
					<Link to="/">
						<img src={logo} className={styles.nav_logo} alt="logo" />
						<span className={styles.logo_text}>Sharelink</span>
					</Link>
				</div>
				{button && (
					<div className={styles.nav_buttons}>
						<div className={styles.sign_in}>
							<Link to="/auth/login">
								<button>Sign In</button>
							</Link>
						</div>
						<div className={styles.create_link}>
							<Link to="/auth/register">
								<button>Create Sharelink</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
