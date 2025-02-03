import { useContext, useEffect } from "react";
import DisplayContext from "../../../../store/displayContext";
import styles from "./Settings.module.css";
import FormButton from "../../../../components/Button/FormButton";
import AuthContext from "../../../../store/authContext";

export const Settings = () => {
	const dtx = useContext(DisplayContext);
	const atx = useContext(AuthContext);

	useEffect(() => {
		dtx.onPageChange("Settings");
	}, []);

	return (
		<div className={styles.container}>
			<form className={styles.settings_form}>
				<div className={styles.form_controls}>
					<div className={styles.group_control}>
						<div className={styles.form_control}>
							<label>First name</label>
							<input defaultValue={atx.isUser.firstName} disabled />
						</div>
						<div className={styles.form_control}>
							<label>Last name</label>
							<input defaultValue={atx.isUser.lastName} disabled />
						</div>
					</div>
					<div className={styles.form_control}>
						<label>Username</label>
						<input defaultValue={atx.isUser.username} />
					</div>
					<div className={styles.form_control}>
						<label>Phone number</label>
						<input defaultValue={atx.isUser.lastname} disabled />
					</div>
					<div className={styles.form_control}>
						<label>Email address</label>
						<input defaultValue={atx.isUser.email} disabled />
					</div>
					<div className={styles.group_control}>
						<div className={styles.form_control}>
							<label>BVN</label>
							<input defaultValue={atx.isUser.bvn} disabled />
						</div>
						<div className={styles.form_control}>
							<label>Account number</label>
							<input defaultValue={atx.isUser.accountNumber} disabled />
						</div>
					</div>
					<div className={styles.form_action}>
						<FormButton text={"Submit"} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default Settings;
