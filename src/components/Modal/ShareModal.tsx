import { Link } from "react-router-dom";
import Modal from "./Modal";
import styles from "./ShareModal.module.css";

export const ShareModal = (props: any) => {
	const endDate = new Date(props.end);
	endDate.setHours(23); // Set hours (24-hour format, e.g., 15 = 3 PM)
	endDate.setMinutes(59); // Set minutes
	endDate.setSeconds(59); // Set seconds (optional)

	return (
		<Modal classname={styles.share_modal}>
			<div className={styles.header}>
				<span>Sharelink Generated!</span>
			</div>
			<div className={styles.link}>
				<span>
					<Link to={props.link}>{props.link}</Link>
					<i className="fa-regular fa-copy" />
				</span>
			</div>
			<div className={styles.socials}>
				<span>Share now</span>
				<span className={styles.whatsapp}>
					<i className="fa-brands fa-whatsapp" />
				</span>
				<span className={styles.facebook}>
					<i className="fa-brands fa-facebook" />
				</span>
				<span className={styles.instagram}>
					<i className="fa-brands fa-instagram" />
				</span>
				<span className={styles.twitter}>
					<i className="fa-brands fa-twitter" />
				</span>
				<span className={styles.mail}>
					<i className="fa-regular fa-envelope" />
				</span>
			</div>
			<div className={styles.button}>
				<button>Track Participation</button>
			</div>
			<div className={styles.footer}>
				<span>Sharelink valid until {endDate.toUTCString()}</span>
			</div>
		</Modal>
	);
};

export default ShareModal;
