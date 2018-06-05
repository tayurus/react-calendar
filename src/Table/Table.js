import React from "react";
import './Table.css';
class Table extends React.Component {

    matrixify(arr, rows, cols) {
        var matrix = [];
        if (rows * cols === arr.length) {
            for (var i = 0; i < arr.length; i += cols) {
                matrix.push(arr.slice(i, cols + i));
            }
        }
        return matrix;
    };



    render() {
        let clickKey = 0;
        return (<table>
            <tbody>
                <tr>
                    <th>ПН</th>
                    <th>ВТ</th>
                    <th>СР</th>
                    <th>ЧТ</th>
                    <th>ПТ</th>
                    <th>СБ</th>
                    <th>ВС</th>
                </tr>
                {

                    this.matrixify(this.props.days, 6,7).map((row, index) => {
                        return (
                            <tr>
                                {row.map((day,index)=>
                                    <td data-key={clickKey++}
                                        className={day.clicked ? "clickedDay" : "q"}
                                        onClick={ this.props.onDayClick }>
                                        {day.day}
                                    </td>)}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>)
    }
}

export default Table;
