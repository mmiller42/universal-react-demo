import { createServer } from 'http'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import http from 'http'
import express from 'express'
import mustache from 'mustache'
import App from '../client/components/App'

const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
const PORT = process.env.PORT || 8000

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
	const context = {}

	const html = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	)

	if (context.url) {
		res.redirect(301, context.url)
	} else {
		res.send(mustache.render(index, { app: html }))
	}
})

const server = new http.Server(app)
server.listen(PORT)
console.log(`\nApplication available at http://localhost:${PORT}\n`)
