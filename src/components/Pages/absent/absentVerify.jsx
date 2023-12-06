import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../../images/success.png";
import "./absentVerify.css";
import { Fragment } from "react/cjs/react.production.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AbsentVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                toast.success("Validation...", { position: toast.POSITION.TOP_CENTER })
                const url = `https://mern-backend-4lkz.onrender.com/absent/sendmail/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                toast.error(`occurred error validation:${error}`, { position: toast.POSITION.TOP_CENTER })
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
                <div className="container-verify">
                    <img src={success} alt="success_img" className="success_img" />
                    <div>Xác nhận phép thành công</div>
                    <Link to="/absent">
                        <button className="green_btn-verify">Danh sách nghỉ phép</button>
                    </Link>
                </div>
            ) : (

                <div className="error-verify">Xác nhận đã hết hạn !!!</div>


            )}
        </Fragment>
    );
};

export default AbsentVerify;