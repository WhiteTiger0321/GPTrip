import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "user" && password === "pass") {
			navigate("/blocks");
		} else {
			setError("아이디나 비밀번호가 잘못되었습니다.");
		}
	};

	return (
		<div className="login">
			<h2>로그인</h2>
			<form onSubmit={handleLogin}>
				<div className="id">
					<label>아이디</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="password">
					<label>비밀번호</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">로그인</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
}

export default Login;
