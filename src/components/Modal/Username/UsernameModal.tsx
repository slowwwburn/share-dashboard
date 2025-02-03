import Modal from "../Modal";
import styles from "./UsernameModal.module.css";

const UsernameModal = (props: any) => {
	console.log(props.user);
	return (
		<Modal>
			<div className={styles.container}>
				<div className={styles.header}>
					Welcome {props.user || ""}! {"\uD83C\uDF89"}
				</div>
				<div className={styles.text}>
					Your dashboard is fully set up and ready to go!
				</div>
				<div className={styles.text}>
					To get started, please enter your preferred unique Sharelink <br />
					username in the text field below.
				</div>
				<div className={styles.form}>
					{props.error && <span className={styles.error}>{props.error}</span>}
					<div className={styles.input_wrapper}>
						<i className={`${styles.fas} fa-solid fa-at`}></i>
						<input
							ref={props.inputRef}
							onBlur={props.blur}
							onChange={props.change}
							type="text"
							placeholder="Enter your username"
						/>
					</div>
					<button onClick={props.submit}>Let's Go!</button>
				</div>
				<div>
					Not ready yet? You can always{" "}
					<span className={styles.logout} onClick={props.logout}>
						log out
					</span>{" "}
					and set this up later.
				</div>
			</div>
		</Modal>
	);
};

export default UsernameModal;
