import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./totalAbsent.css";

function CrudTotal() {
    const [total, setTotal] = useState([]);

    useEffect(function () {
        const userId = localStorage.getItem("token");
        async function getTotal() {
            try {
                const response = await axios.get(`https://mern-backend-4lkz.onrender.com/absent/total/${userId}}`);
                setTotal(response.data);
                // console.log(cruds.map(crud => crud.verified))
            } catch (error) {
                console.log("error", error);
            }
        }
        getTotal();
    }, []);

    const [day, setDay] = useState(7)
    const autodays = () => {
        function job() {
            setDay(day += 1);
        }
        const startDate = new Date('2023-12-01');
        function daysSinceStart() {
            const currentDate = new Date();
            const delta = Math.floor((currentDate - startDate) / (1000 * 3600 * 24))
            return delta;
        }
        function scheduleJob() {
            if (daysSinceStart() === 30) {
                job();
                startDate.setDate(startDate.getDate() + 30);
            }
            setTimeout(scheduleJob, 24 * 3600 * 1000);
        }
        scheduleJob()
    }
    autodays();

    return (
        <div className="container-absent-total">
            <Link to="/absent" className="btn-home-total">
                Danh sách nghỉ phép
            </Link>
            <div>
                <h2>
                    <div className="table-title-total">Tổng ngày phép cá nhân : {day}</div>

                </h2>
                <div className="tb-total">
                    <div className="sub-tb-total">Tổng ngày phép còn lại :</div>
                </div>
                <hr />
            </div>

            <div className="table-responsive-total">
                <table className="tb-container-total">
                    <thead>
                        <tr>
                            <th> Tên nhân viên</th>
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