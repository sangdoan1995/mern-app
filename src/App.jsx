import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Todo from "./components/Pages/Todolist/formTodo";
import Absent from "./components/Pages/absent/absent";
import Create from "./components/Pages/absent/createAbsent";
import SendMail from "./components/Pages/absent/sendMail";
import AbsentVerify from "./components/Pages/absent/absentVerify";
import { path } from "./constant";
import EmailVerify from "./components/EmailVerify";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path={path.HOME} exact element={<Main />} />}
			<Route path={path.SIGNUP} exact element={<Signup />} />
			<Route path={path.LOGIN} exact element={<Login />} />
			<Route path={path.HOME} element={<Navigate replace to={path.LOGIN} />} />
			<Route path={path.VERIFY_EMAIL} element={<EmailVerify />} />
			<Route path={path.TODO} element={<Todo />} />
			<Route path={path.LISTVIEW} element={<Absent />} />
			<Route path={path.CREATE} element={<Create />} />
			<Route path={path.SENDMAIL} element={<SendMail />} />
			<Route path={path.ABSENT_VERIFY} element={<AbsentVerify />} />

		</Routes>
	);
}

export default App;
