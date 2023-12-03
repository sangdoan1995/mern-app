import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./sendMail.css";

const SendMail = (req, res) => {
    const [crud, setCrud] = useState('');
    const param = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const handleGetData = async (req, res) => {
            const { data } = await axios.get(`https://mern-backend-4lkz.onrender.com/absent/sendmail/${param.id}`);
            setCrud(data);
        }
        handleGetData();
    }, [])

    const handleSend = async (req, res) => {
        try {
            await axios.post(`https://mern-backend-4lkz.onrender.com/absent/sendmail/${param.id}`)
            console.log('send success')
            navigate('/absent')
        } catch (err) {
            console.log(err)
        }

    }
    const handleDelete = async (req, res) => {
        try {
            await axios.post(`https://mern-backend-4lkz.onrender.com/absent/sendmail/delete/${param.id}`)
            console.log('delete success');
            navigate('/absent/create')

        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="container-sendmail">
            <h1>Mẫu đơn nghỉ phép</h1>
            <div className="content-send">
                <div className="send-title">Tên nhân viên</div>: {crud.staffName}
            </div>

            <div className="content-send" >
                <div className="send-title">Số ngày nghỉ</div>: {crud.daysleave}
            </div>
            <div className="content-send">
                <div className="send-title">Từ ngày</div>: {crud.daysfrom}
            </div>
            <div className="content-send">
                <div className="send-title">Đến ngày</div>: {crud.daysto}
            </div>
            <div className="content-send">
                <div className="send-title">Lí do nghỉ phép</div>: <div align="justify">{crud.description}</div>
            </div>

            <div className="btn-group ">

                <button onClick={handleSend} className="btn btn-danger">
                    Gửi xác nhận
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                    Close
                </button>
            </div>
            <hr />
        </div>
    );
}

export default SendMail;