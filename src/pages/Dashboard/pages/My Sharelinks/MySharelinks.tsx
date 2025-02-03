import { useContext, useEffect } from "react";
import styles from "./MySharelinks.module.css";
import DisplayContext from "../../../../store/displayContext";
import Card from "../../../../components/Card/Card";
import Insight from "../../../../components/Insights/Insights";
import SharelinkContext from "../../../../store/sharelinkContext";
import Table from "../../../../components/Table/Table";
import Filter from "../../../../components/Table/Filter";
import { Link } from "react-router-dom";

export const MySharelinks = () => {
	const dtx = useContext(DisplayContext);
	const stx = useContext(SharelinkContext);

	useEffect(() => {
		dtx.onPageChange("My Sharelinks");
		stx.onGetMySharelinks();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<Link to="/mysharelinks/create?misc=1">
				<button>
					<i className="fa-solid fa-plus"></i>
					<span>
						Create <br />
						Sharelink
					</span>
				</button>
				</Link>
			</div>
			<Table
				id="mysharelinks"
				tableData={stx.mySharelinks}
				page={stx.page.pageNumber}
				last={stx.page.totalPages}
				prev={stx.onPrevPage}
				next={stx.onNextPage}
			/>
		</div>
	);
};

export default MySharelinks;
