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
        if(!startValues) {
            // Initialize cells to null
            let tempState = [];
            for(let i = 0; i < 9; i++) {
                let temp = [];
                for(let j = 0; j < 9; j++) {
                    let tempCell = {
                        value: null,
                        id: (i*9) + (j),
                        mutable: true,
                        row: i,
                        col: j,
                        box: null,
                    };
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

                    }
                    temp[j] = tempCell;
                }
                tempState[i] = temp;
            }
            console.log(tempState);
            return tempState;
        } else if(startValues) {
            // Read sudoku game from array of integers
            let tempState = [];
            for(let i = 0; i < 9; i++) {
                let temp = [];
                for(let j = 0; j < 9; j++) {
                    let tempCell = {
                        value: startValues[i*9 + j],
                        id: (i*9) + (j),
                        mutable: true,
                        row: i,
                        col: j,
                        box: null,
                    };
                    if(tempCell.value !== null) {
                        tempCell.mutable = false;
                    }

                    temp[j] = tempCell;
                }
                tempState[i] = temp;
            }
            return tempState;
        }
    }

    handleClick(id) {
        let newCells = this.state.cells.slice();
        let changedCell = this.getCell(id);
        if(changedCell.mutable === true) {
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

    setCell(id, cell, state) {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(state[i][j].id === id) {
                    state[i][j] = cell;
                }
            }
        }
    }

    renderCell(id) {
        return (
            <Cell key={id}
                value={this.getCell(id).value}
                onClick={() => this.handleClick(id)}
                  className={this.getCell(id).boxEdge}
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
