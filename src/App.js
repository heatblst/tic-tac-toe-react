import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTurn: "X",
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      winner: null,
      winnerPlayer : null,
    }
  }
 
  handleClick(index) {
    if(this.state.board[index] === "" && !this.state.winner) {
      this.state.board[index] = this.state.currentTurn;
      this.setState({
        board: this.state.board,
        winnerPlayer : this.state.currentTurn,
        currentTurn: this.state.currentTurn === "X" ? "0" : "X",
        winner: this.checkForWinner(),
        rounDraw : !this.state.board.includes(""),
      });
    }
  }
  handleRestart=()=>{
       this.setState({
        currentTurn : "X",
         board :  [
          "", "", "", "", "", "", "", "", ""
        ],
        winner: null,
        winnerPlayer : null,
       })
  }
  checkForWinner() {
    var currentTurn = this.state.currentTurn;
    var symbols = this.state.board;
    var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    
    return winningCombinations.find(function(combo)  {
      if(symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
        return currentTurn;
      } else {
        return false;
      }
    });
  }

  render() {
    return (
      <div className="app-container">
        <div className="board">
            {this.state.board.map((cell, index) => {
              return <div key={index} onClick={() => this.handleClick(index)} className="square">{cell}</div>;
            })}
        </div>
        {this.state.winner ? <h2 className="winner">{`Player ${this.state.winnerPlayer} won!!!!`}</h2> : null }
        {this.state.rounDraw ? <h2 className="winner">{`Draw!!!!`}</h2> : null }
        <button className="btn btn-primary" onClick={this.handleRestart}>Restart</button>
      </div>
    )
  }
}

export default App;
