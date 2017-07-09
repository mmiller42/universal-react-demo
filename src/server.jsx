import { createServer } from 'http'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import http from 'http'
import express from 'express'
import mustache from 'mustache'
import App from './components/App'

const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
const PORT = process.env.PORT || 8000

const app = express()

// Webpack's client build puts bundled assets in dist/public, so this will serve
// all of those assets like a typical static HTTP server.
app.use('/public', express.static(path.join(__dirname, 'public')))

// For all other requests (not covered by `/public`), we use ReactDOMServer to
// render the app.
app.use((req, res) => {
	const context = {}

	// StaticRouter simply looks at the current URL and renders the applicable
	// content, without needing any notion of a history. Here we provide a context
	// object, which could be mutated by react-router. We do this because if the
	// given URL actually issues a redirect, we can intercept what the new URL
	// should be and issue a 301 redirect here.
	const html = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	)

	if (context.url) {
		// If the context was aggregated with a new URL, redirect to it.
		res.redirect(301, context.url)
		return
	}

	// Take the rendered string of HTML and inject it into our HTML template using
	// mustache.
	res.send(mustache.render(index, { app: html }))
})

const server = new http.Server(app)
server.listen(PORT)
console.log(`\nApplication available at http://localhost:${PORT}\n`)
