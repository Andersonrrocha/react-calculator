import React, { Component } from "react";
import "./Calculator.css";

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
	displayValue: '0',
	clearDisplay: false,
	operation: null,
	values: [0, 0],
	current: 0,
	darkMode: false
}

export default class Calculator extends Component {

	state = {...initialState}

	constructor(props) {
		super(props)
		this.clearMemory = this.clearMemory.bind(this)
		this.setOperation = this.setOperation.bind(this)
		this.addDigit = this.addDigit.bind(this)
		this.changeMode = this.changeMode.bind(this)
	}

	clearMemory() {
		this.setState({ ...initialState })
	}

	setOperation(operation) {
		if(this.state.current === 0) {
			this.setState({ operation, current: 1, clearDisplay: true})
		} else {
			const equals = operation === '='
			const currentOperation = this.state.operation

			const values = [...this.state.values]
			try {
				values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
			} catch (e) {
				values[0] = this.state.values[0]
			}
			values[1] = 0
			this.setState({
				displayValue: values[0],
				operation: equals ? null : operation,
				current: equals ? 0 : 1,
				clearDisplay: !equals,
				values
			})
		}
	}

	addDigit(n) {
		if (n === '.' && this.state.displayValue.includes('.')) {
			return
		}

		const clearDisplay = this.state.displayValue === '0'
			|| this.state.clearDisplay

		const currentValue = clearDisplay ? '' : this.state.displayValue
		const displayValue = currentValue + n

		this.setState({ displayValue, clearDisplay: false })

		if(n !== '.') {
			const i = this.state.current
			const values = [...this.state.values]
			values[i] = parseFloat(displayValue)
			this.setState({ values })
		}
	}

	changeMode() {
		if( this.state.darkMode) {
			this.setState({darkMode: false})
		} else {
			this.setState({darkMode: true})
		}
	}

    render() {

        return <div className='calculator'>
			<Display value={this.state.displayValue}/>
			<Button label={this.state.darkMode ? '☀️' : '🌙'} click={this.changeMode} mode={this.state.darkMode}/>
			<Button label="AC" click={this.clearMemory} mode={this.state.darkMode} double/>
			<Button label="/" click={this.setOperation} mode={this.state.darkMode} operation/>
			<Button label="7" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="8" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="9" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="*" click={this.setOperation} mode={this.state.darkMode} operation/>
			<Button label="4" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="5" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="6" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="-" click={this.setOperation} mode={this.state.darkMode} operation/>
			<Button label="1" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="2" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="3" click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="+" click={this.setOperation} mode={this.state.darkMode} operation/>
			<Button label="0" click={this.addDigit} mode={this.state.darkMode} double/>
			<Button label="." click={this.addDigit} mode={this.state.darkMode}/>
			<Button label="=" click={this.setOperation} mode={this.state.darkMode} operation/>


		</div>;
    }
}
