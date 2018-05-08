import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleChangePrinciple = this.handleChangePrinciple.bind(this)
    this.handleChangeInterest = this.handleChangeInterest.bind(this)
    this.handleChangeInstallment = this.handleChangeInstallment.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      principle: 0,
      interest: 0.00,
      number_installment: 0,
      table: []
    }
  }

  handleChangePrinciple(e) {
      this.setState({ principle: parseInt(e.target.value) || 0 })
  }

  handleChangeInterest(e) {
    this.setState({ interest: parseFloat(e.target.value) || 0.00 })
  }

  handleChangeInstallment(e){
    let age = (60 - parseInt(e.target.value)) * 12
    this.setState({ number_installment: age || 0 })
  }

  submitForm(event){
    event.preventDefault()
    var table = this.state.table
    var resentprinciple = this.state.principle
    for (var i = 0; i <= this.state.number_installment ; i++){
      var interestformonth = (resentprinciple * (this.state.interest/100) * 30) / 365
      var moneyfirst = interestformonth * (this.state.interest / 100) + interestformonth
      resentprinciple = resentprinciple - moneyfirst
      var total = interestformonth + moneyfirst
      var tablepush = {
        total: total,
        interestformonth : interestformonth,
        moneyfirst: moneyfirst,
        resentprinciple: resentprinciple
      }
      table.push(tablepush)
      this.setState({ table: table })
    }
    console.log(this.state.table)
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
                <label>อายุผู้กู้</label>
                <input type="number" className="form-control" onChange={this.handleChangeInstallment}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
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
                <td>{tables.total.toFixed(2)}</td>
                <td>{tables.interestformonth.toFixed(2)}</td>
                <td>{tables.moneyfirst.toFixed(2)}</td>
                <td>{tables.resentprinciple.toFixed(2)}</td>
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
