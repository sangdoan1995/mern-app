import "./formTodo.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";


const TodoApp = () => {
    const [reminderMsg, setReminderMsg] = useState("");
    const [toEmail, settoEmail] = useState("");
    const [remindAt, setRemindAt] = useState();
    const [reminderList, setReminderList] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("token")
                await axios.get(`https://mern-backend-4lkz.onrender.com/getAllReminder/${token}`)
                    .then((res) => setReminderList(res.data))
                    .catch((error) => { console.log(error) });
            } catch (error) {
                console.log(error)
            }
        };
        fetchData()
    }, []);


    const addReminder = async (req, res) => {
        if (reminderMsg && remindAt && toEmail) {
            const token = localStorage.getItem("token")
            try {
                const userId = param.id;
                await axios.post("https://mern-backend-4lkz.onrender.com/addReminder", { reminderMsg, remindAt, toEmail, token })
                    .then((res) => {
                        setReminderList(res.data);
                    });
                setReminderMsg("")
                setRemindAt()
                settoEmail("")

            } catch (error) {
                console.log(error)
            }
            window.location.reload()
        } else {
            setReminderList(false)
            console.log('Hãy điền đầy đủ thông tin nhắc nhở')
        }
        // window.location.reload()
    };

    const deleteReminder = async (id) => {
        await axios.post(`https://mern-backend-4lkz.onrender.com/deleteReminder`, { id })
            .then(res => setReminderList(res.data))

        window.location.reload();
    };

    return (
        <div className="App">
            <div className="homepage">
                <div className="homepage_header">
                    <h1> Nhắc Nhở Công Việc ⏳  </h1>
                    <input
                        type="text"
                        placeholder="Tiêu đề nhắc nhở...."
                        required
                        value={reminderMsg}
                        onChange={(e) => setReminderMsg(e.target.value)}

                    />
                    <input
                        type="text"
                        placeholder="Email nhận...."
                        required
                        value={toEmail}
                        onChange={(e) => settoEmail(e.target.value)}
                    />

                    <DateTimePicker
                        value={remindAt}
                        onChange={setRemindAt}
                        minDate={new Date()}
                        minutePlaceholder="mm"
                        hourPlaceholder="hh"
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearAriaLabel="YYYY"
                        required
                    />
                    <div className="button" onClick={addReminder}>
                        Thêm nhắc nhở
                    </div>
                </div>

                <div className="homepage_body">
                    {
                        (Array.isArray(reminderList) ? (
                            reminderList.map(reminder => (
                                <div className="reminder_card" key={reminder._id}>
                                    <h2>{reminder.reminderMsg}</h2>
                                    <h3>Nhắc Nhở ⏰:</h3>

                                    <p>{String(new Date(reminder.remindAt.toLocaleString("en-US", { timezone: "Asia/Kolkata" })))}</p>
                                    <div className="button" onClick={() => deleteReminder(reminder._id)}>Xoá nhắc nhở</div>
                                </div>
                            ))) : (<div className="no-reminders">Nhắc nhở không tồn tại. Hãy điền đầy đủ thông tin nhắc nhở</div>)
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default TodoApp;