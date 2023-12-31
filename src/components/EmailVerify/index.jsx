import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				toast.success("Validation success", { position: toast.POSITION.TOP_CENTER });
				const url = `https://mern-backend-4lkz.onrender.com/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				toast.error(`error validation:${error}`, { position: toast.POSITION.TOP_CENTER })
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			<ToastContainer />
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (

				<h1 className={styles.error}>Error Link Expire !! Please register again..</h1>


			)}
		</Fragment>
	);
};

export default EmailVerify;
