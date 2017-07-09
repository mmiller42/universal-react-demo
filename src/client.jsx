import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import history from './services/history'
import App from './components/App'

const appContainer = document.querySelector('.app')

render()

if (module.hot) {
	module.hot.accept('./components/App', render)
}

function render() {
	// AppContainer is just used by the hot reloader and does nothing in
	// production. BrowserRouter uses the HTML5 API to change the URL dynamically
	// without reloading the page, using the history module to keep this in sync.
	ReactDOM.render(
		<AppContainer>
			<BrowserRouter history={history}>
				<App />
			</BrowserRouter>
		</AppContainer>,
		appContainer
	)
}

export default appContainer
