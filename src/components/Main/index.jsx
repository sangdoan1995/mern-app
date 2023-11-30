import styles from "./styles.module.css";
import { Link } from "react-router-dom"

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Home Pages</h1>

				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.content}>
				<Link to="/todo">
					<div className={styles.option}>
						<div className={styles.title}>Reminder Working</div>
						<div className={styles.body_work}></div>
						<div className={styles.btn}>Select</div>
					</div>
				</Link>
				<Link>
					<div className={styles.option}>
						<div></div>
						<div className={styles.title}>Absent</div>
						<div className={styles.body_ebsent}></div>
						<div className={styles.btn}>Select</div>
					</div>
				</Link>
			</div>


		</div>
	);
};

export default Main;
