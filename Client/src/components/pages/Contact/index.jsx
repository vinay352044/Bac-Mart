import axios from "axios"
import React, { useState } from "react"
import { toast } from "react-toastify"

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	})
	const [isLoading, setIsLoading] = useState(false)
	const { name, email, phone, message } = formData

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	async function translateMessage(text) {
		if (text === undefined || text === null || text.trim().length === 0) return ""

		const translateAPI = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURI(text)}`

		try {
			const response = await axios.get(translateAPI)
			if (response.status == 200) {
				return response.data[0][0][0]
			}
		} catch (err) {
			return "-"
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			const translatedMessage = await translateMessage(message)
			const response = await fetch(import.meta.env.VITE_CONTACT_FORM_DATA_API, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([
					{
						name: name,
						email: email,
						"phone no": phone,
						message: message,
						"translated message": translatedMessage,
						"date/time": new Date().toLocaleString("en-in"),
					},
				]),
			})
			if (response.ok || response.status == 201) {
				toast.success("Message Sent Successfully")
			} else {
				throw new Error("Something Went Wrong")
			}
			setIsLoading(false)
			setFormData({ name: "", email: "", phone: "", message: "" })
		} catch (error) {
			setIsLoading(false)
			toast.error("Something Went Wrong")
		}
	}

	const inputGroupClass = "flex flex-col mt-2"
	const inputLabelClass = "text text-gray-600"
	const inputClass =
		"px-2 py-1 border rounded-md focus:outline-none bg-[#0296db20!important] border-[#0296db20!important] focus:border-[#0295db]"

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			<div className="w-screen mt-5 text-center text-3xl">
				<h1>Contact Us</h1>
			</div>
			<div className="w-[max(300px,40vw)] mx-auto mt-3 p-6 rounded shadow">
				<div className="contact-form">
					<form onSubmit={handleSubmit}>
						<div className={inputGroupClass}>
							<label htmlFor="name" className={inputLabelClass}>
								Name
							</label>
							<input
								className={inputClass}
								type="text"
								name="name"
								id="name"
								value={formData.name}
								onChange={handleInputChange}
								autoComplete="off"
								required
							/>
						</div>
						<div className={inputGroupClass}>
							<label htmlFor="email" className={inputLabelClass}>
								Email
							</label>
							<input
								className={inputClass}
								type="email"
								name="email"
								id="email"
								value={formData.email}
								onChange={handleInputChange}
								autoComplete="off"
								required
							/>
						</div>
						<div className={inputGroupClass}>
							<label htmlFor="phone" className={inputLabelClass}>
								Contact No <small>(optional)</small>
							</label>
							<input
								className={inputClass}
								type="number"
								name="phone"
								id="phone"
								value={formData.phone}
								onChange={handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className={inputGroupClass}>
							<label htmlFor="message" className={inputLabelClass}>
								Message
							</label>
							<textarea
								className={inputClass}
								name="message"
								id="message"
								cols="30"
								rows="5"
								value={formData.message}
								onChange={handleInputChange}
								autoComplete="off"
								required
							/>
						</div>
						<div className="form-btn">
							<button
								type="submit"
								className="bg-[#0295db!important] hover:bg-[white!important] mt-4 px-3 py-2 rounded-md text-white hover:text-[#0295db] border-2 border-[#0295db!important] transition">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
export default Contact
