"use client"

import React from "react"
import { Controller, useForm } from "react-hook-form"
import { signOut, signUp } from "../../lib/firebase/auth"
import { useRouter } from "next/navigation"

function SignUpForm() {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const router = useRouter()

	async function submitValues(data) {
		await signUp(data.email, data.password)

		router.push("/signin")
	}

	return (
		<div>
			<form
				className="flex flex-col"
				onSubmit={handleSubmit(submitValues)}
			>
				<div>
					<label htmlFor="emailInput">Email</label>
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<input
								id="emailInput"
								type="email"
								{...field}
							/>
						)}
					/>
				</div>
				<div>
					<label htmlFor="passwordInput">Password</label>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<input
								id="passwordInput"
								type="password"
								{...field}
							/>
						)}
					/>
				</div>
				<button>Sign Up</button>
			</form>
		</div>
	)
}

export default SignUpForm
