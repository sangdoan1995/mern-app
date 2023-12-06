import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "./createAbsent.css";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CrudAdd = () => {
    const userId = localStorage.getItem("token")
    const number = Math.floor(900000 * Math.random()) + 100000;
    const [crud, setCrud] = useState({
        userId: userId,
        id: number,
        staffName: "",
        daysleave: "",
        daysfrom: "",
        daysto: "",
        description: "",

    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        toast.info("Loading data ...", { position: toast.POSITION.TOP_RIGHT })
        const data = await axios.post('https://mern-backend-4lkz.onrender.com/absent/create', crud)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        navigate(`/absent/sendmail/${crud.id}`)
    }

    function handleCancel() {
        toast.warning("come back", { position: toast.POSITION.TOP_RIGHT })
        navigate("/absent");
    }

    return (
        <div className="container-root-create">
            <div className="container-create" style={{ maxWidth: "400px" }}>
                <h1>Tạo mẫu phép</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên nhân viên</label>
                        <input
                            name="staffName"
                            type="text"
                            required
                            value={crud.staffName}
                            onChange={(event) => setCrud({ ...crud, staffName: event.target.value })}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Số ngày nghỉ</label>
                        <input
                            name="daysleave"
                            type="number"
                            value={crud.daysleave}
                            required
                            min={0}
                            className="form-control"
                            onChange={(e) => setCrud({ ...crud, daysleave: e.target.value })}
                        />
                        <small>Format:0.5 or 1</small>
                    </div>
                    <div className="form-group">
                        <label>Từ ngày</label>

                        <DateTimePicker
                            name='daysfrom'
                            value={crud.daysfrom}
                            onChange={(e) => setCrud({ ...crud, daysfrom: e })}
                            mindate={new Date()}
                            minutePlaceholder="mm"
                            hourPlaceholder="hh"
                            dayPlaceholder="DD"
                            monthPlaceholder="MM"
                            yearAriaLabel="YYYY"
                            required

                        />

                        <small>Format: 12/25/2023 08:00 AM</small>
                    </div>
                    <div className="form-group">
                        <label>Đến ngày</label>
                        <DateTimePicker
                            name='daysto'
                            value={crud.daysto}
                            onChange={(e) => setCrud({ ...crud, daysto: e })}
                            mindate={new Date()}
                            minutePlaceholder="mm"
                            hourPlaceholder="hh"
                            dayPlaceholder="DD"
                            monthPlaceholder="MM"
                            yearAriaLabel="YYYY"
                            required
                        />
                        <small>Format: 12/25/2023 05:00 PM</small>
                    </div>

                    <div className="form-group">
                        <label>Lí do nghỉ phép</label>
                        <textarea
                            name="description"
                            row="10"
                            value={crud.description}
                            onChange={(e) => setCrud({ ...crud, description: e.target.value })}
                            className="form-control"
                        />
                    </div>
                    <ToastContainer />
                    <div className="btn-group">

                        <input type="submit" value="Submit" className="btn btn-primary" onClick={handleSubmit} />

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

        </div>

    );
}

export default CrudAdd;