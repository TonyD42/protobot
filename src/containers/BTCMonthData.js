import React, {Component} from "react";
import "./Data.css";
import Chart from './Chart';
import { getBTCMonthlyTradingData, getCurrentBitcoinData } from "./Utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

export default class Data extends React.Component {	
	constructor(props) {
		super(props);

		this.goToMonth = this.goToMonth.bind(this)
		this.goToWeek = this.goToWeek.bind(this)
		this.goToDay = this.goToDay.bind(this)
		
		this.state = {
			tradingData: [],
			currentData: [],
			isLoading: true,
			error: null,
		};
	}
	getHistoricalData(){
		getBTCMonthlyTradingData().then(data => {
			this.setState({ 
				tradingData: data,
				isLoading: false,
			});
		})
		}

	getCurrentBtcData(){
		getCurrentBitcoinData().then(response => {
			this.setState({ //Map through data in json file and assign values
				currentData: response.map(item => ({
					High: item.High,
					Low: item.Low,
					indicator: item.indicator,
					openPrice: item.Open_Price,
					closePrice: item.Close_Price,
					closeTime: item.Close_time,
					openTime: item.Open_Time,
			}))
		});
			});
	}
	
	getIndicator(){
		const {currentData} = this.state;
		if (currentData[currentData.length-1].indicator === true)
			return "Buy"
		else
			return "Sell"
	}

	goToMonth(){
		this.props.history.push("/BTCMonthData")
	}

	goToWeek(){
		this.props.history.push('/btcData')
	}

	goToDay(){
		this.props.history.push('/btcDayData')
	}

	async componentDidMount(){
		await this.getCurrentBtcData();
		await this.getHistoricalData();
	}

    render(){
			const {currentData} = this.state;
		if (this.state.isLoading === true) {
			return <div><h3>Loading...</h3></div>
		}
		return (
			<div className="chart">
            <h1>Bitcoin Historical Data: 1 Month</h1>
				<TypeChooser>
					{type => <Chart type={type} data={this.state.tradingData} />}
				</TypeChooser>
				<button value="month" type="submit" onClick={this.goToMonth}>Month</button>
				<button value="week" type="submit" onClick={this.goToWeek}>Week</button>
				<button value="day" type="submit" onClick={this.goToDay}>Day</button>
				<br/><br/>
				<h3>Indicator: <b>{this.getIndicator()}</b></h3>
				<table>
					<thead>
						<tr>
							<th>High Price</th>
							<th>Low Price</th>
							<th>Open Price</th>
							<th>Close Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${currentData[currentData.length-1].High}</td>
							<td>${currentData[currentData.length-1].Low}</td>
							<td>${currentData[currentData.length-1].openPrice}</td>
							<td>${currentData[currentData.length-1].closePrice}</td>
						</tr>
					</tbody>
				</table>
			</div>
			);
	}
}
    
