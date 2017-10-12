import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet'

import Home from '../routes/home';
import Profile from '../routes/profile';
import Cmd from '../routes/cmd';
import Header from "./header";
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	constructor() {
        super();
        this.title = 'Test App';
	}
	
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Helmet />
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Cmd path="/cmd/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
