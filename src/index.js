import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function Cell(props) {
    return (
        <button className="cell" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: this.fillCells(this.props.value.startValues),
            solution: this.fillCells(this.props.value.solutionValues),
        }
    }

    fillCells(startValues) {
        // Initialize cells to null if no startValues are passed
        let tempState = [];
        for(let i = 0; i < 9; i++) {
            let tempRow = [];
            for(let j = 0; j < 9; j++) {
                let tempCell;
                if(startValues) {
                    tempCell = {
                        value: startValues[i*9 + j],
                        id: (i*9) + (j),
                        isMutable: true,
                        row: i,
                        col: j,
                        box: null,
                    };
                    if(tempCell.value !== null) {
                        tempCell.isMutable = false;
                    }
                } else {
                    tempCell = {
                        value: null,
                        id: (i*9) + (j),
                        isMutable: true,
                        row: i,
                        col: j,
                        box: null,
                    };
                }
                // Determine which box the cell is in
                switch(true) {
                    case(tempCell.id < 9):
                        tempCell.box = 0;
                        break;
                    case(tempCell.id < 18):
                        tempCell.box = 1;
                        break;
                    case(tempCell.id < 27):
                        tempCell.box = 2;
                        break;
                    case(tempCell.id < 36):
                        tempCell.box = 3;
                        break;
                    case(tempCell.id < 45):
                        tempCell.box = 4;
                        break;
                    case(tempCell.id < 54):
                        tempCell.box = 5;
                        break;
                    case(tempCell.id < 63):
                        tempCell.box = 6;
                        break;
                    case(tempCell.id < 72):
                        tempCell.box = 7;
                        break;
                    case(tempCell.id < 81):
                        tempCell.box = 8;
                        break;
                    default:
                        break;
                }
                tempRow[j] = tempCell;
            }
            tempState[i] = tempRow;
        }
        console.log(tempState);
        return tempState;
    }

    handleClick(id) {
        let newCells = this.state.cells.slice();
        let changedCell = this.getCell(id);
        if(changedCell.isMutable === true) {
            if(changedCell.value === null) {
                changedCell.value = 1;
            } else if(changedCell.value === 9) {
                changedCell.value = null;
            } else {
                changedCell.value++;
            }
        } else {
            return;
        }
        this.setCell(id, changedCell, newCells);

        this.setState({
            cells: newCells,
        })
    }

    getCell(id) {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(this.state.cells[i][j].id === id) {
                    return this.state.cells[i][j];
                }
            }
        }
    }

    // Set cell
    setCell(id, cell) {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(this.state.cells[i][j].id === id) {
                    let temp = this.state.cells;
                    temp[i][j] = cell;
                    this.setState({
                        cells: temp,
                    })
                }
            }
        }
    }

    // Iterate over cells and check against solution
    checkIfSolved() {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(this.state.cells[i][j].value === this.state.solution[i][j]) {
                    return true;
                }
            }
        }
        return false;
    }

    renderCell(id) {
        const cell = this.getCell(id);
        return (
            <Cell key={id}
                value={cell.value}
                onClick={() => this.handleClick(id)}
                  className={"cell"}
            />
        );
    }

    render() {
        return (
            this.state.cells.map((row) =>
                <div className="grid-row" key={this.state.cells.indexOf(row)}>
                    {
                        row.map((cell) =>
                            this.renderCell(cell.id)
                        )
                    }
                </div>
            )
        );
    }
}

class Sudoku extends React.Component {
    render() {
        return (
            <div className="sudoku">
                <div className="sudoku-grid">
                    <Grid value={{startValues: [null, 1, null, null, null, null, null, null, 8,
                                null, null, 2, null, 7, 6, null, 5, null,
                                null, null, null, 4, null, null, 1, 2, 6,
                                null, 2, 8, null, null, null, null, 7, 5,
                                null, null, null, 2, 9, 7, null, null, null,
                                7, 4, null, null, null, null, 2, 1, null,
                                4, 9, 5, null, null, 2, null, null, null,
                                null, 8, null, 5, 1, null, 4, null, null,
                                2, null, null, null, null, null, null, 9, null],
                                solutionValues: []}}/>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Sudoku />,
    document.getElementById('root')
);
