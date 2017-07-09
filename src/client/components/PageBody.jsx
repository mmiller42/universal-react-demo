import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Users from './Users'

export default function PageBody() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/about" component={About} />
			<Route path="/users" component={Users} />
		</Switch>
	)
}
