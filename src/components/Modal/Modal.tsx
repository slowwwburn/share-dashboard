import styles from "./Modal.module.css";
import { ReactNode, useState } from "react";

interface ModalProps {
	onClose?: () => void;
	classname?: string;
	zIndexClass?: string;
	children: ReactNode;
}

export const Modal = ({
	onClose,
	classname,
	children,
	zIndexClass,
}: ModalProps) => {
	return (
		<div className={`${styles.modal} ${zIndexClass}`}>
			<div className={styles.background} onClick={onClose} />
			<div className={styles.container}>
				{onClose && (
					<div className={styles.close} onClick={onClose}>
						<i className="fa-solid fa-xmark" />
					</div>
				)}
				<div
					className={`${styles.modal_content} ${classname}`}
					onClick={(e) => e.stopPropagation()}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
