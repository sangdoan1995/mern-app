import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./totalAbsent.css";

function CrudTotal() {
    const [total, setTotal] = useState([]);
    const [data2, setData2] = useState([]);

    const userId = localStorage.getItem("token");
    useEffect(function () {
        async function getTotal() {
            try {
                const response = await axios.get(`https://mern-backend-4lkz.onrender.com/absent/total/${userId}`)
                    .then(res => setTotal(res.data))
                    .catch(err => console.log(err));

            } catch (error) {
                console.log("error", error);
            }
        }
        const getDataTotal = async (req, res) => {
            await axios.get(`https://mern-backend-4lkz.onrender.com/absent/totaluser/${userId}`)
                .then(res => setData2(res.data))
                .catch(err => console.log(err))
        }
        getTotal();
        getDataTotal();

    }, []);

    const data = JSON.parse(JSON.stringify(total));
    let sum = data2.totalDate;
    for (let i = 0; i < data.length; i++) {
        if (typeof data[i].daysleave === 'number') {
            sum -= data[i].daysleave;
        } else {
            console.error(`Kiểu dữ liệu không hợp lệ cho mục ${i} trong mảng 'data'`)
        }
    }

    const Postdate = async (freeDate) => {
        if (freeDate) {

            await axios.post(`https://mern-backend-4lkz.onrender.com/absent/leavedate/${userId}`, { freeDate })
                .then(res => console.log('post success', res.data))
                .catch(err => console.log(err));
        }

    }
    Postdate(sum);


    // auto update + 1 ngay
    const autoupdatedays = () => {
        let totalDate = data2.totalDate;
        console.log(totalDate)
        async function job() {
            totalDate += 1;
            const userId = localStorage.getItem("token");
            await axios.post(`https://mern-backend-4lkz.onrender.com/absent/totaldate/${userId}`, { totalDate })
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
        }

        const startDate = new Date('2023-12-01');
        function daysSinceStart() {
            const currentDate = new Date();
            const delta = Math.floor((currentDate - startDate) / (1000 * 3600 * 24))
            return delta;
        }

        function scheduleJob() {
            if (daysSinceStart() >= 30) {
                job();
                startDate.setDate(startDate.getDate() + 30);
            }
        }
        setTimeout(() => {
            scheduleJob()
        }, 24 * 3600 * 1000);

    }
    autoupdatedays();


    return (
        <div className="container-absent-total">
            <Link to="/absent" className="btn-home-total">
                Danh sách nghỉ phép
            </Link>
            <div>
                <h2>
                    <div className="table-title-total">Danh sách nghỉ phép cá nhân</div>

                </h2>
                <div className="table-title-total-2">Tổng ngày phép cá nhân : {data2.totalDate}</div>
                <div className="table-title-total-2">Ngày phép còn lại : {sum}</div>
                <hr />
            </div>

            <div className="table-responsive-total">
                <table className="tb-container-total">
                    <thead>
                        <tr>
                            <th>Tên nhân viên</th>
                            <th>Số ngày nghỉ</th>
                            <th>Từ ngày</th>
                            <th>Đến ngày</th>
                            <th>Tình trạng phép</th>
                        </tr>
                    </thead>

                    <tbody>
                        {total &&
                            total.map((crud) => {
                                return (
                                    <tr key={crud._id}>
                                        <td>{crud.staffName}</td>
                                        <td>{crud.daysleave}</td>
                                        <td>{crud.daysfrom}</td>
                                        <td>{crud.daysto}</td>
                                        <td>{(crud.verified) ? "Đã xác nhận" : "Chưa xác nhận"}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default CrudTotal;