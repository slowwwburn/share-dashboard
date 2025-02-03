import { useContext, useEffect, useState } from "react";
import styles from "./Overview.module.css";
import DisplayContext from "../../../../store/displayContext";
import Insight from "../../../../components/Insights/Insights";
import giveIcon from "../../../../assets/link-2.svg";
import walletIcon from "../../../../assets/wallet-2.svg";
import activityIcon from "../../../../assets/activity.svg";
import Table from "../../../../components/Table/Table";
import { Link, NavLink } from "react-router-dom";
import FundModal from "../../../../components/Modal/FundModal";
import logo from "../../../assets/share_logo.svg";
import fundImg from "../../../assets/fund_img.svg";
import sharelinks from "../../../../assets/links.json";
import Card from "../../../../components/Card/Card";
import WalletContext from "../../../../store/walletContext";
import AuthContext from "../../../../store/authContext";
import UsernameModal from "../../../../components/Modal/Username/UsernameModal";
import WalletComponent from "../../../../components/Wallet/WalletComponent";

type SharelinkType = {
	id?: string;
	dateTime?: string;
	sizeCount?: string;
	balance?: string;
	name?: string;
	goal?: string;
	status?: string;
};

export const Overview = () => {
	const dtx = useContext(DisplayContext);
	const wtx = useContext(WalletContext);
	const atx = useContext(AuthContext);
	const [isActive, setActive] = useState(2);
	const [linkData, setLinkData] = useState<SharelinkType[]>([]);
	const wallet = {
		name: "Bruce Wayne",
		account: "1234567890",
		balance: "250,000.00",
	};

	const links: SharelinkType[] = sharelinks;

	console.log(dtx.isModalOpen);

	const onChange = (tab: number) => {
		switch (tab) {
			case 0:
				setLinkData(links.filter((link) => link.status === "Inactive"));
				break;
			case 1:
				setLinkData(links.filter((link) => link.status === "Active"));
				break;
			default:
				setLinkData(links);
				break;
		}
		setActive(tab);
	};

	useEffect(() => {
		dtx.onPageChange("Dashboard");
		setLinkData(links);
	}, []);

	console.log(atx.isUser);

	return (
		<div className={styles.container}>
			{dtx.isModalOpen && (
				<FundModal
					close={dtx.onToggleModal}
					fund={wtx.onFundWallet}
					user={atx.isUser.id}
				/>
			)}
			<div className={styles.left}>
				<div className={styles.top}>
					<Link to="/mysharelinks/create?misc=1">
						<Card className={styles.new_link}>
							<div className={styles.top_header}>
								<span className={styles.top_icon}>
									<i className="fa-solid fa-plus sm"></i>
								</span>
							</div>
							<div className={styles.top_content}>Create New Sharelink</div>
						</Card>
					</Link>
					<WalletComponent />
					{/* <Card className={styles.wallet}>
						<div className={styles.top_header}>
							<div>
								<span className={styles.top_icon}>
									<i className="fa-solid fa-wallet sm"></i>
								</span>
								<span className={styles.wallet_balance}>
									&#8358;{wtx.aWallet.balance}
								</span>
							</div>
							<span className={styles.top_icon}>
								<i className="fa-solid fa-eye sm"></i>
							</span>
						</div>
						<div className={styles.top_content}>
							<div className={styles.wContent_information}>
								<div className={styles.wContent_header}>Wallet</div>
								<div className={styles.wContent_name}>
									{atx.isUser.firstName} {atx.isUser.lastName}
								</div>
								{wtx.aWallet.dvaccount && (
									<span className={styles.wContent_account}>
										{wtx.aWallet.dvaccount}{" "}
										<i className="fa-regular fa-copy"></i>
									</span>
								)}
							</div>
							{!wtx.aWallet.dvaccount && (
								<div className={styles.wContent_funding}>
									<button onClick={fundWallet}>Fund Wallet</button>
								</div>
							)}
						</div>
					</Card> */}
				</div>
				<div className={styles.middle}>
					<Card className={styles.middle_content}>
						<div className={styles.quick_header}>Quick Links</div>
						<div className={styles.quick_links}>
							<span>
								<Link to="/mysharelinks/create?item=cash">
									<span className={styles.quick_icon}>
										<i className="fa-solid fa-money-bill-wave"></i>
									</span>
								</Link>
								<span>Cash</span>
							</span>
							<span>
								<Link to="/mysharelinks/create?item=airtime">
									<span className={styles.quick_icon}>
										<i className="fa-solid fa-phone-volume"></i>
									</span>
								</Link>
								<span>Airtime</span>
							</span>
							<span>
								<Link to="/mysharelinks/create?item=data">
									<span className={styles.quick_icon}>
										<i className="fa-solid fa-wifi"></i>
									</span>
								</Link>
								<span>Data</span>
							</span>
							<span>
								<Link to="/mysharelinks/create?item=electricity">
									<span className={styles.quick_icon}>
										<i className="fa-solid fa-lightbulb"></i>
									</span>
								</Link>
								<span>Electricity</span>
							</span>
							<span>
								<Link to="/mysharelinks/create?item=cable">
									<span className={styles.quick_icon}>
										<i className="fa-solid fa-tv"></i>
									</span>
								</Link>
								<span>Cable/TV</span>
							</span>
						</div>
					</Card>
				</div>
				<div className={styles.bottom}></div>
			</div>
			<div className={styles.right}>
				<div className={styles.sharelinks_header}>
					<span>Ongoing Sharelinks</span>
					<span>View all</span>
				</div>
				<div className={styles.sharelinks_options}>
					<span
						className={isActive === 2 ? styles.active : ""}
						onClick={() => onChange(2)}
					>
						All
					</span>
					<span
						className={isActive === 1 ? styles.active : ""}
						onClick={() => onChange(1)}
					>
						Active
					</span>
					<span
						className={isActive === 0 ? styles.active : ""}
						onClick={() => onChange(0)}
					>
						Inactive
					</span>
				</div>
				<div className={styles.sharelinks_table}>
					{linkData.length > 0 &&
						linkData.map((link) => {
							return (
								<div key={link.id} className={styles.sharelink_item}>
									<span className={styles.item_content}>
										<span className={styles.item_icon}>
											<i className="fa-solid fa-hand-holding-heart" />
										</span>
										<span className={styles.item_text}>
											<span className={styles.item_name}>{link.name}</span>
											<span className={styles.item_tagline}>{link.goal}</span>
										</span>
									</span>
									<span>{link.sizeCount}</span>
								</div>
							);
						})}
				</div>
			</div>
			{/* <div className={styles.table}>
					<Table
						id="Giveaways"
						title="ShareLinks Generated"
						tableData={links}
						max={10}
						raw={[]}
						empty={
							<span>
								No Sharelinks at this time <br />{" "}
								<Link to="/">Create Sharelink</Link>
							</span>
						}
					/>
				</div> */}
		</div>
	);
};

export default Overview;
