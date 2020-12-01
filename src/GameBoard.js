import { Component } from 'react';

class GameBoard extends Component {
  render() {
    return(
       <div className={`gameBoard ${this.props.userName ? "" : "hidden"}`}>
          {/* add conditional: if this.state.userName !== '' then add className hidden */}
          {
            this.props.questionsArray.map((gameQuestion, i) => {
              return (
                <div
                  key={gameQuestion.id}
                  className={`question question${i}`}
                  onClick={(i) => { this.props.handleClick(i) }}>
                  <p><span>$</span>{gameQuestion.value}</p>
                  <p>{gameQuestion.category.title}</p>
                </div>
              )
            })
          }
        </div>





    )
  }
}

export default GameBoard;