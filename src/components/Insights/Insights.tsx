import { Link } from "react-router-dom";
import styles from "./Insights.module.css";
import { useContext } from "react";
import DisplayContext from "../../store/displayContext";

interface InsightType {
	icon: string;
	title: string;
	value: string;
	link: string | (() => void);
	linkText: string;
}

interface InisghtProps {
	data: InsightType[];
}

export const Insight = ({ data }: InisghtProps) => {
	const dtx = useContext(DisplayContext);

	return (
		<div className={styles.insights}>
			<div className={styles.insights_container}>
				{data.length > 0 ? (
					data.map((insight, key) => (
						<div key={key} className={styles.insight}>
							<div className={styles.insight_header}>
								<span className={styles.insight_icon}>
									<img src={insight.icon} />
								</span>
								<span className={styles.insight_link}>
									{typeof insight.link === "string" && (
										<Link to={insight.link}>
											<span>{insight.linkText}</span>
										</Link>
									)}

									{typeof insight.link !== "string" && (
										<span onClick={insight.link}>{insight.linkText}</span>
									)}
								</span>
							</div>
							<div className={styles.insight_content}>
								<span className={styles.insight_title}>{insight.title}</span>
								<span className={styles.insight_value}>{insight.value}</span>
							</div>
							{/* <div className={styles.insight_footer}>
							<Link to={insight.link}>
								<span>{insight.linkText}</span>
							</Link>
						</div> */}
						</div>
					))
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
};

export default Insight;
