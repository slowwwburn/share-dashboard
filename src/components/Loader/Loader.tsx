import React from "react";
import styles from "./Loader.module.css";
import logo from "../../assets/share_logo.svg";

export default function LoadingSpinner() {
	return (
		<div className={styles.spinner_container}>
			<img src={logo} className={styles.loading_spinner} alt="Loader" />
		</div>
	);
}
