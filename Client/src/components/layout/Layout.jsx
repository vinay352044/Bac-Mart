import React from "react"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => {
	return (
		<>
			<Navbar />
			<div className="min-h-[85vh]">
				<Outlet />
			</div>
			<Footer />
		</>
	)
}

export default Layout
