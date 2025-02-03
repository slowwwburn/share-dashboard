import { useContext } from "react";
import AuthContext from "../../../store/authContext";
import Modal from "../Modal";
import styles from "./UpdatePassword.module.css";

const UpdatePassword = (props: any) => {
	const atx = useContext(AuthContext);

	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.header}>Update your password</div>
				<div className={styles.text}>
					To ensure account security, please update your password.
				</div>
				<div>
					{props.error && <span className={styles.error}>{props.error}</span>}
					<form className={styles.signup_form} onSubmit={atx.onChangePassword}>
						<div className={styles.form_controls}>
							<div className={styles.form_control}>
								<input
									// className={
									// 	atx.invalidInput && !atx.firstNameIsValid
									// 		? `${styles.error}`
									// 		: ""
									// }
									ref={atx.currentPasswordRef}
									name="currentPassword"
									type="password"
									onChange={atx.currentPasswordHandler}
									// defaultValue={atx.signUpData.firstName}
									onBlur={atx.validateCurrentPassword}
									placeholder="Current Password"
								/>
							</div>
							<div className={styles.form_control}>
								<input
									// className={
									// 	atx.invalidInput && !atx.lastNameIsValid
									// 		? `${styles.error}`
									// 		: ""
									// }
									ref={atx.newPasswordRef}
									name="newPassword"
									type="password"
									onChange={atx.newPasswordHandler}
									// defaultValue={atx.signUpData.lastName}
									onBlur={atx.validateNewPassword}
									placeholder="New Password"
								/>
							</div>
							<div className={styles.form_control}>
								<input
									// className={
									// 	atx.invalidInput && !atx.phoneIsValid
									// 		? `${styles.error}`
									// 		: ""
									// }
									ref={atx.confirmNewPasswordRef}
									name="phone"
									type="password"
									onChange={atx.confirmNewPasswordHandler}
									// defaultValue={atx.signUpData.phone}
									onBlur={atx.validateConfirmNewPassword}
									placeholder="Confirm New Password"
								/>
							</div>
							<div className={styles.form_action}>
								<button>Submit</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default UpdatePassword;
