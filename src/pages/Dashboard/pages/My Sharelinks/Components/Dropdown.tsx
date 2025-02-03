import styles from "./Dropdown.module.css";
import { useContext } from "react";
import SharelinkContext from "../../../../../store/sharelinkContext";

const Dropdown = () => {
	const stx = useContext(SharelinkContext);
	const logged = (user: any) => {
		// alert(`You clicked ${user.username}`);
		console.log(user);
	};

	// const addUser = (user: any) => {
	// 	stx.addUserHandler(user)
	// }
	return (
		<div className={styles.dropdown}>
			{stx.foundUsers.length > 0 ? (
				stx.foundUsers.map((suggestion, index) => (
					<div
						tabIndex={0}
						key={index}
						onClick={(e) => {
							e.stopPropagation();
							stx.addUserHandler(suggestion);
						}}
						className={styles.dropdown_item}
					>
						@{suggestion.username}
					</div>
				))
			) : (
				<span className={styles.dropdown_item}>No users found</span>
			)}
		</div>
	);
};

export default Dropdown;
