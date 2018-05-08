import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleChangePrinciple = this.handleChangePrinciple.bind(this)
    this.handleChangeInterest = this.handleChangeInterest.bind(this)
    this.HandleMonth = this.HandleMonth.bind(this)
    this.HandleAge = this.HandleAge.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      principle: 0,
      interest: 5.99,
      month: 0,
      day: 30,
      age: 0,
      table: []
    }
  }

  handleChangePrinciple(e) {
      this.setState({ principle: parseInt(e.target.value) || 0 })
  }

  handleChangeInterest(e) {
    this.setState({ interest: parseFloat(e.target.value) || 0.00 })
  }

  HandleAge(e){
    let ages = (60 - parseInt(e.target.value)) * 12
    this.setState({ age: ages || 0 })
  }

  HandleMonth (event) {
    this.setState({month: parseInt(event.target.value)|| 0})
  }

  submitForm(event){
    event.preventDefault()
    if(this.state.age < this.state.month && this.state.age > 0){
        alert("จำนวณการผ่อนชำระเกินอายุ 60 ไม่สามารถทำการกู้ได้")
        window.location.reload();
    }
    else if(this.state.age <= 0) {
        alert("คุณมีอายุครบหรือเกิน 60 ปี ไม่สามารถทำการกู้ได้")
        window.location.reload();
    }
    var tables = this.state.table
    var money = this.state.principle
    var interest = (this.state.interest /100) /12
    var month = this.state.month
    var pmt = this.PMT(interest,month,money)
    pmt = Math.abs(pmt)
    for (var i = 0; i <= this.state.month ; i++){
      var sumInterest = (money * (this.state.interest/100) * 30) / 365
      var sumPrinciple = pmt - sumInterest
      if(money <= sumPrinciple) {
        pmt = money + sumInterest
        sumPrinciple = money
        money = 0
      } else {
        money = money - sumPrinciple
      }
      var tablepush = {
        pmt: pmt,
        CalInterest : sumInterest,
        CalPrinciple: sumPrinciple,
        money: money
      }
      tables.push(tablepush)
    }
    this.setState({ table: tables })
    console.log(this.state.table)
  }

  PMT (rate, nper, pv, fv, type) {
		if (!fv) fv = 0;
		if (!type) type = 0;

		if (rate === 0) return -(pv + fv)/nper;
		
		var pvif = Math.pow(1 + rate, nper);
		var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

		if (type === 1) {
			pmt /= (1 + rate);
		};

		return pmt;
	}

  render() {
    return (
      <div className="App">
        <center><h1>คำนวนเงินกู้</h1></center>
        <div className="container">
          <form onSubmit={this.submitForm}>
            <div className="form-group">
                <label>จำนวนเงินที่ต้องการกู้ (บาท)</label>
                <input type="number" className="form-control" value={this.state.principle} onChange={this.handleChangePrinciple}/>
            </div>
            <div className="form-group">
                <label>อัตราดอกเบี้ยเงินกู้ต่อปี (%)</label>
                <input type="number" className="form-control" value={this.state.interest} onChange={this.handleChangeInterest}/>
            </div>
            <div className="form-group">
                <label>ผ่อนชำระ (งวด) :</label>
                <input type="text" className="form-control" value={this.state.month} onChange={this.HandleMonth}/>
            </div>
            <div className="form-group">
                <label>อายุผู้กู้</label>
                <input type="number" className="form-control" onChange={this.HandleAge}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">งวดที่</th>
                <th scope="col">จำนวนผ่อนชำระต่องวด</th>
                <th scope="col">ชำระดอกเบี้ย</th>
                <th scope="col">ชำระเงินต้น</th>
                <th scope="col">เงินต้นคงเหลือ</th>
              </tr>
            </thead>
            <tbody>
            {this.state.table.map((tables, index) =>
              <tr>
                <th scope="row">{index+1}</th>
                <td>{tables.pmt.toFixed(2)}</td>
                <td>{tables.CalInterest.toFixed(2)}</td>
                <td>{tables.CalPrinciple.toFixed(2)}</td>
                <td>{tables.money.toFixed(2)}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
