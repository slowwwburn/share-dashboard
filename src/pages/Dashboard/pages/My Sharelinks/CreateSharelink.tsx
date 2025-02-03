import { useContext, useEffect, useState } from "react";
import DisplayContext from "../../../../store/displayContext";
import styles from "./CreateSharelink.module.css";
import dropStyle from "./Components/Dropdown.module.css";
import { Link, useLocation } from "react-router-dom";
import FormButton from "../../../../components/Button/FormButton";
import previewImg from "../../../../../src/assets/Gifting Photo Nursery Art.jpg";
import SharelinkContext from "../../../../store/sharelinkContext";
import ShareModal from "../../../../components/Modal/ShareModal";
import Dropdown from "./Components/Dropdown";

export const CreateSharelink = () => {
	const dtx = useContext(DisplayContext);
	const stx = useContext(SharelinkContext);
	const query = new URLSearchParams(useLocation().search);

	const misc = query.get("misc");
	const item = query.get("item");

	const [focused, setIsFocused] = useState(false);

	const toogleDropdown = (e: React.FocusEvent<HTMLInputElement>) => {
		// setIsFocused((prev) => !prev);
		setTimeout(() => {
			setIsFocused((prev) => !prev);
		}, 50);
		// console.log(e.relatedTarget?.classList)
		// if (!e.relatedTarget?.classList.contains(dropStyle.dropdown_item)) {
		// 	setIsFocused((prev) => !prev);
		// 	// setIsFocused(false);
		// }
	};

	useEffect(() => {
		console.log(item);
		if (item) {
			stx.itemHandler(item);
		}
	}, [item]);

	useEffect(() => {
		if (stx.inputRefs.users?.current?.focus()) {
			setIsFocused(true);
		} else {
			setIsFocused(false);
		}
	}, [stx.inputRefs.users]);

	useEffect(() => {
		dtx.onPageChange("Create Sharelink");
	}, []);

	return (
		<div className={styles.container}>
			{stx.isCreated.status && (
				<ShareModal
					link={`${process.env.REACT_APP_WEBSITE}/sh/${
						stx.isCreated.data?.code || ""
					}`}
					end={stx.sharelinkData.endDate}
				/>
			)}
			<div className={styles.left}>
				<form className={styles.sharelink_form}>
					<div className={styles.form_controls}>
						<div className={styles.form_control}>
							<label>Give your Sharelink a name</label>
							<input
								className={
									stx.invalidInput && !stx.nameIsValid ? `${styles.error}` : ""
								}
								ref={stx.inputRefs.name}
								name="name"
								type="text"
								onChange={stx.nameHandler}
								defaultValue={stx.sharelinkData.name}
								onBlur={stx.validateTextHandler}
							/>
						</div>
						<div className={styles.form_control}>
							<label>Give your Sharelink a goal</label>
							<input
								className={
									stx.invalidInput && !stx.descIsValid ? `${styles.error}` : ""
								}
								ref={stx.inputRefs.goal}
								name="goal"
								type="text"
								onChange={stx.goalHandler}
								defaultValue={stx.sharelinkData.goal}
								onBlur={stx.validateTextHandler}
							/>
						</div>
						<div className={styles.form_control}>
							<label>What type of Sharelink do you want to create?</label>
							<div className={styles.special_control}>
								<span>
									<input
										ref={stx.inputRefs.type}
										name="public"
										type="radio"
										value="PUBLIC"
										onChange={stx.typeHandler}
										checked={stx.sharelinkData.type === "PUBLIC"}
									/>
									Public
								</span>
								<span>
									<input
										ref={stx.inputRefs.type}
										name="private"
										type="radio"
										value="PRIVATE"
										onChange={stx.typeHandler}
										checked={stx.sharelinkData.type === "PRIVATE"}
									/>
									Private
								</span>
							</div>
						</div>
						{misc && (
							<div className={styles.form_control}>
								<label>What would you like to share?</label>
								<div className={styles.special_control}>
									<span>
										<input
											ref={stx.inputRefs.item}
											name="cash"
											type="checkbox"
											value="CASH"
											onChange={stx.itemHandler}
											checked={
												item === "cash" ||
												stx.sharelinkData?.item?.includes("CASH")
											}
											disabled={!!!misc}
										/>
										Cash
									</span>
									<span>
										<input
											ref={stx.inputRefs.item}
											name="airtime"
											type="checkbox"
											value="AIRTIME"
											onChange={stx.itemHandler}
											checked={
												item === "airtime" ||
												stx.sharelinkData?.item?.includes("AIRTIME")
											}
											disabled={!!!misc}
										/>
										Airtime
									</span>
									<span>
										<input
											ref={stx.inputRefs.item}
											name="data"
											type="checkbox"
											value="DATA"
											onChange={stx.itemHandler}
											checked={
												item === "data" ||
												stx.sharelinkData?.item?.includes("DATA")
											}
											disabled={!!!misc}
										/>
										Data
									</span>
									<span>
										<input
											ref={stx.inputRefs.item}
											name="electricity"
											type="checkbox"
											value="ELECTRICITY"
											onChange={stx.itemHandler}
											checked={
												item === "electricity" ||
												stx.sharelinkData?.item?.includes("ELECTRICITY")
											}
											disabled={!!!misc}
										/>
										Electricity
									</span>
									<span>
										<input
											ref={stx.inputRefs.item}
											name="cable"
											type="checkbox"
											value="CABLE"
											onChange={stx.itemHandler}
											checked={
												item === "cable" ||
												stx.sharelinkData?.item?.includes("CABLE")
											}
											disabled={!!!misc}
										/>
										Cable/TV
									</span>
								</div>
							</div>
						)}
						<div className={styles.group_control}>
							<div className={styles.form_control}>
								<label>Upload image Photo</label>
								<div className={styles.uploader_container}>
									<label className={styles.uploader} htmlFor="upload">
										<i className="fa-solid fa-upload" />
									</label>
									<span id={styles.uploadformat}>
										Supported formats: JPG, JPEG, PNG
										<br />
										<span id={styles.uploadsize}>Maximum file size: 5MB</span>
									</span>
								</div>
								<input
									ref={stx.inputRefs.image}
									id="upload"
									accept=".jpg,.png"
									name="image"
									className={styles.upload}
									type="file"
									onChange={stx.imageHandler}
								/>
							</div>
							{(stx.sharelinkData.type === "" ||
								stx.sharelinkData.type === "PUBLIC") && (
								<>
									<div className={styles.form_control}>
										<label>Number of Participants</label>
										<input
											className={
												stx.invalidInput && !stx.sizeIsValid
													? `${styles.error}`
													: ""
											}
											ref={stx.inputRefs.size}
											name="size"
											type="number"
											onChange={stx.sizeHandler}
											defaultValue={stx.sharelinkData.size}
											onBlur={stx.validateSizeHandler}
										/>
									</div>
								</>
							)}
							{stx.sharelinkData.type === "PRIVATE" && (
								<>
									<div className={styles.form_control}>
										<label>Select Users</label>
										<input
											className={
												stx.invalidInput && !stx.sizeIsValid
													? `${styles.error}`
													: ""
											}
											ref={stx.inputRefs.users}
											name="users"
											type="text"
											onChange={stx.selectUsersHandler}
											value={stx.searchInput}
											onFocus={toogleDropdown}
											onBlur={toogleDropdown}
										/>
										{focused && <Dropdown />}
									</div>
								</>
							)}
						</div>
						<div className={styles.form_control}>
							<label>Total Amount you would like to share?</label>
							<input
								className={
									stx.invalidInput && !stx.amountIsValid
										? `${styles.error}`
										: ""
								}
								ref={stx.inputRefs.amount}
								name="amount"
								type="text"
								onChange={stx.amountHandler}
								value={stx.sharelinkData.total || "0.00"}
								onBlur={stx.validateAmountHandler}
							/>
						</div>
						<div className={styles.group_control}>
							<div className={styles.form_control}>
								<label>Start Date</label>
								<input
									ref={stx.inputRefs.startDate}
									name="start"
									type="date"
									onChange={stx.dateHandler}
									onBlur={stx.validateDateHandler}
									max={stx.sharelinkData.endDate}
								/>
							</div>
							<div className={styles.form_control}>
								<label>End Date</label>
								<input
									className={
										stx.invalidInput && !stx.endIsValid ? `${styles.error}` : ""
									}
									ref={stx.inputRefs.endDate}
									name="end"
									type="date"
									onChange={stx.dateHandler}
									onBlur={stx.validateDateHandler}
									min={stx.sharelinkData.startDate}
								/>
							</div>
						</div>
						<div className={styles.form_action}>
							<FormButton text={"Submit"} click={stx.onCreateLink} />
						</div>
					</div>
				</form>
			</div>
			<div className={styles.right}>
				<div className={styles.preview}>
					{!stx.sharelinkData.imageUrl && <img src={previewImg} />}
					{stx.sharelinkData.imageUrl && (
						<img src={stx.sharelinkData.imageUrl} />
					)}
					<div>Sharelink name: {stx.sharelinkData.name}</div>
					<div>Sharelink type: {stx.sharelinkData.type?.toUpperCase()}</div>
					<div>
						Sharelink item: {stx.sharelinkData.item?.join(", ").toUpperCase()}
					</div>
					{stx.sharelinkData.type === "PRIVATE" ? (
						<div className={styles.preview_users}>
							Participants:{" "}
							{stx.sharelinkData.users?.map((user, index) => (
								<span key={index}>
									<div className={styles.userImg}>
										{user.image && <img src={user.image} />}
										{!user.image && (
											<div style={{ backgroundColor: user.color }}>
												{user.initials}
											</div>
										)}
										<span
											className={styles.closeButton}
											onClick={() => stx.deleteUserHandler(user)}
										>
											&times;
										</span>
									</div>
								</span>
							))}
						</div>
					) : null}
					<div>No of Participants: {stx.sharelinkData.size}</div>
					<div>Total Amount: {stx.sharelinkData.total}</div>
					<div>Participant Receives: {stx.sharelinkData.amount}</div>
					<div>
						<i className="fa-solid fa-clock" /> Duration:
					</div>
					<div>Criteria:</div>
				</div>
			</div>
		</div>
	);
};

export default CreateSharelink;
