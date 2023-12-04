import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../../images/success.png";
import "./absentVerify.css";
import { Fragment } from "react/cjs/react.production.min";

const AbsentVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `https://mern-backend-4lkz.onrender.com/absent/sendmail/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <Fragment>
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