import crypto from "crypto-js";

// const jwtSecret = process.env.REACT_APP_jwtSecret;

export default class Utils {
	static capitalize(str: string) {
		if (!str) return str;
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}

	static generateSignature(body: any) {
		if (process.env.REACT_APP_jwtSecret) {
			let signature = crypto
				.HmacSHA512(
					crypto.enc.Utf8.parse(body),
					crypto.enc.Utf8.parse(process.env.REACT_APP_jwtSecret)
				)
				.toString(crypto.enc.Hex);
			return signature;
		} else {
			return;
		}
	}

	static formatNumberWithCommas = (num: string) => {
		const [integer, decimal] = num.split(".");
		const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return `${formattedInteger}.${decimal}`;
	};

	static formatNumber = (value: string) => {
		const number = parseFloat(value);
		if (isNaN(number)) {
			throw new Error("Invalid input: not a valid number");
		}

		return number.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	static toReadableFormat(amountInSmallestUnit: string) {
		return (Number(amountInSmallestUnit) / 100).toFixed(2);
	}
	static toSmallestUnit(amount: string) {
		return Math.round(Number(amount) * 100);
	}
	static formatDateToShort(dateString: string | number) {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "short",
			year: "numeric",
		};
		return date.toLocaleDateString("en-GB", options).replace(",", "");
	}
}
