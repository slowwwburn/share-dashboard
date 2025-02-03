import { useState, useEffect } from "react";
import styles from "./Carousel.module.css";

interface ReviewType {
	img: string;
	name: string;
	review: string;
}

interface CarouselProp {
	data: ReviewType[];
}

export const Carousel = ({ data }: CarouselProp) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((next) => (next + 1) % data.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
	};

	useEffect(() => {
		// const autoSlide = setInterval(() => {
		// 	nextSlide();
		// }, 3000); // Auto transition every 3 seconds
		// return () => clearInterval(autoSlide);
	}, []);

	const translateX = -currentSlide * 100;

	return (
		<div className={styles.carousel}>
			<div
				className={styles.carousel_content}
				style={{ transform: `translateX(${translateX}%)` }}
			>
				{data.map((review, key) => (
					<div key={key} className={styles.carousel_item}>
						<div className={styles.carousel_img}>
							<img src={review.img} alt={review.name} />
						</div>
						<div className={styles.carousel_name}>{review.name}</div>
						<div className={styles.carousel_message}>
							{review.review}
						</div>
					</div>
				))}
			</div>
			<button
				className={`${styles.carousel_control} ${styles.prev}`}
				onClick={prevSlide}
			>
				&#10094;
			</button>
			<button
				className={`${styles.carousel_control} ${styles.next}`}
				onClick={nextSlide}
			>
				&#10095;
			</button>
		</div>
	);
};

export default Carousel;
