import { useState } from 'react';
import styles from '../styles/Login.module.css';

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/home'
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
			<form method='POST' onSubmit={loginUser}>
			<h1>Login</h1>
				<input
					className= {styles.usernameInput}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="Username"
				/>
				<br />
				<input
					className={styles.passwordInput}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<button type="submit" value="Login" className={styles.loginButton}>Login</button>
                <p id="create" className="text-center text-muted small">
                Don't have an account? 
                <a className="link" href="/register">Register Here!</a>
                </p>
			</form>
		</div>
	)
}

export default Login