import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Register.module.css';

function Register() {
	const navigate = useNavigate()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate.push('/login')
		}
	}

	return (
		<div>
			<form method='POST' onSubmit={registerUser}>
			<h1>Register</h1>
				<input
					className={styles.firstNameInput}
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					type="text"
					placeholder="First Name"
				/>
				<br />
				<input
					className={styles.lastNameInput}
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					type="text"
					placeholder="Last Name"
				/>
				<br />
				<input
					className={styles.emailInput}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					className={styles.usernameInput}
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
				<input
					className={styles.confirmPasswordInput}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					type="password"
					placeholder="Confirm Password"
				/>
				<br />
				<input type="submit" value="Register" className={styles.registerButton} />
			</form>
		</div>
	)
}

export default Register