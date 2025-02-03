import styles from "./Card.module.css";

type CardProp = {
	className?: string;
	children: React.ReactNode;
};
export const Card = ({ className, children }: CardProp) => {
	return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
