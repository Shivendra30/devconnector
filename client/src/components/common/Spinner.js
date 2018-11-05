import React, { Component } from 'react';
import spinner from './spinner.gif';

class Spinner extends Component {
	render() {
		return (
			<div>
				<img
					style={{ width: '200px', margin: 'auto', display: 'block' }}
					src={spinner}
					alt="Loading..."
				/>
			</div>
		);
	}
}

export default Spinner;
