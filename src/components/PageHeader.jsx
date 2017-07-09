import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageHeader() {
	return (
		<div>
			<h1>Universal React Demo</h1>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/about">About</NavLink>
					</li>
					<li>
						<NavLink to="/users">Users</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}
