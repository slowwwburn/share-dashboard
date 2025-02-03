import styles from "./Button.module.css";

export type ButtonProps = {
	text?: string;
	classname?: string;
	click?: (e: any) => void;
};
export const Button = ({ text, classname, click }: ButtonProps) => {
	return (
		<button className={`${styles.button} ${classname}`} onClick={click}>
			{text}
		</button>
	);
};

export default Button;
