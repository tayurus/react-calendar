import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Month from './Month/Month.js';
import Table from './Table/Table.js';
import PropTypes from 'prop-types';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date(), days: Array(42).fill(0), clickedDays: {}}
    }


    onDayClick(e){

        e.currentTarget.classList.toggle("clickedDay")
        let clickedDay = e.currentTarget.getAttribute('data-key');
        let currState = this.state;
        //generate key for current month and year
        let key = currState.date.getMonth() + "-" + currState.date.getFullYear();
        //check if state has array of clicked days for current month
        if (typeof currState.clickedDays[key] == 'undefined'){
            //if has not - create
            currState.clickedDays[key]= [];
        }
        //push clicked day
        currState.clickedDays[key].push(clickedDay);
        currState.days = this.fillDays();
        this.setState(currState)
        // console.log(currState.clickedDays);

    }

    //fill array of visible days
    fillDays(){
        /*get day of week of first day of month*/
        //get indexes of current month and Year
        let monthIndex = this.state.date.getMonth();
        let yearIndex = this.state.date.getFullYear();

        //create new date of first day of this month
        let firstDayDate = new Date(yearIndex, monthIndex, 1);

        //get day of week and add 1 (because in Russia Monday is first day week, bitches)
        let firstDayOfWeek = firstDayDate.getDay() - 1;
        if (firstDayOfWeek == -1)
            firstDayOfWeek = 6;
        if (firstDayOfWeek == 0)
            firstDayOfWeek = 7;

        /*fill the array this month days*/
        let filler = 1;
        let daysInMonth = new Date(yearIndex, monthIndex + 1, 0).getDate();
        let daysInPrevMonth = new Date(yearIndex, monthIndex, 0).getDate();
        let newDays = this.state.days.map((item, index) => {
            let day = 0;
            if (index < firstDayOfWeek)
                day = daysInPrevMonth - firstDayOfWeek + 1 + index;

            if (index >= firstDayOfWeek && filler <= daysInMonth)
                    day = filler++;

            /*fill array to the end of next-month's days*/
            if (filler > daysInMonth)
                day = filler++ - daysInMonth;

            let key = this.state.date.getMonth() + "-" +  this.state.date.getFullYear();
            if (typeof this.state.clickedDays[key] != "undefined")
                if (this.state.clickedDays[key].includes(index.toString()))
                    return {"day": day, clicked:true};

            return {"day": day, clicked:false};
        })
        console.log(newDays);
        return newDays;



    }

    //change current date's month (+-1)
    changeMonth(operation){
        let currState = this.state;
        if (operation == "+")
            currState.date.setMonth(currState.date.getMonth() + 1);
        else
            currState.date.setMonth(currState.date.getMonth() - 1);

        currState.days = this.fillDays();
        this.setState(currState);
    }


    render(){
        return (
        <div className="calendar">
            <Month date={this.state.date} changeMonth={(operation) => this.changeMonth.bind(this,operation)}></Month>
            <Table onDayClick={(e) => this.onDayClick(e)} days={this.state.days}></Table>
        </div>
    )}
}



export default App;
