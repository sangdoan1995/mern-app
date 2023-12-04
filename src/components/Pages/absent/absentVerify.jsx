import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../../images/success.png";
import "./absentVefify.css";
import { Fragment } from "react/cjs/react.production.min";

const AbsentVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `https://mern-app-khdt-mobifone.vercel.app/absent/sendmail/${param.id}/verify/${param.token}`;
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
                <div className="container">
                    <img src={success} alt="success_img" className="success_img" />
                    <h1>Xác nhận phép thành công</h1>
                    <Link to="/absent">
                        <button className="green_btn">Danh sách nghỉ phép</button>
                    </Link>
                </div>
            ) : (

                <h1 className="error">Xác nhận đã hết hạn !!!</h1>


            )}
        </Fragment>
    );
};

export default AbsentVerify;