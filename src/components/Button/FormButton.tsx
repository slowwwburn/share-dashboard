import { Button, ButtonProps } from "./Button";
import styles from "./Button.module.css";

export const FormButton = ({ text, click }: ButtonProps) => {
	return <Button classname={styles.form} text={text} click={click} />;
};

export default FormButton;
