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
