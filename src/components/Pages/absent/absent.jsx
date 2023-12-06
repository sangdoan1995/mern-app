import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./absent.css";

function CrudTable() {
    const [cruds, setCruds] = useState([]);

    useEffect(function () {
        async function getCruds() {
            try {
                const response = await axios.get("https://mern-backend-4lkz.onrender.com/absent/list");
                setCruds(response.data);
                // console.log(cruds.map(crud => crud.verified))
            } catch (error) {
                console.log("error", error);
            }
        }
        getCruds();
    }, []);

    return (
        <div className="container-absent">
            <Link to="/" className="btn-home">
                👈Trang chủ
            </Link>
            <div>
                <h2>
                    <div className="table-title">Danh sách nghỉ phép</div>

                    <p>
                        <Link to="/absent/create" className="btn btn-primary float-right">
                            ✊ Tạo mẫu phép
                        </Link>
                    </p>
                    <p>
                        <Link to="/absent/total" className="btn btn-primary float-right total">
                            ✊ Tổng ngày phép
                        </Link>
                    </p>
                </h2>
                <hr />
            </div>

            <div className="table-responsive">
                <table className="tb-container">
                    <thead>
                        <tr>
                            <th> Tên nhân viên</th>
                            <th>Số ngày nghỉ</th>
                            <th>Từ ngày</th>
                            <th>Đến ngày</th>
                            <th>Lí do nghỉ phép</th>
                            <th>Tình trạng phép</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cruds &&
                            cruds.map((crud) => {
                                return (
                                    <tr key={crud._id}>
                                        <td>{crud.staffName}</td>
                                        <td>{crud.daysleave}</td>
                                        <td>{crud.daysfrom}</td>
                                        <td>{crud.daysto}</td>
                                        <td>{crud.description}</td>
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

export default CrudTable;