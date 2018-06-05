import React, {Component} from 'react';
import './Month.css';

class Month extends React.Component{
    constructor(props){
        super(props);
    }

    //convert "Tue May 15 2018" -> "May 2018"
    formateDate(date){
        let reg = /([a-z]+) ([a-z]+) ([0-9]+) ([0-9]+)/gi;
        let match = reg.exec(date);
        return match[2] + " " + match[4];
    }


    render(){
        let date = this.props.date.toDateString();
        return (
            <div className="month">
                <div className='month__prev' onClick={this.props.changeMonth("-")}></div>
                <div className='month__value'>
                    {this.formateDate(date)}
                </div>
                <div className='month__next' onClick={this.props.changeMonth("+")}></div>
            </div>
        )
    }
}

export default Month;
