import { Component } from 'react';

class GameBoard extends Component {
  render() {
    return (
      <div className={`gameBoard ${this.props.userName ? "" : "hidden"}`}>
        {
          this.props.questionsArray.map((gameQuestion, i) => {
            return (
              <div
                key={gameQuestion.id}
                onClick={() => {
                  this.props.handleClick(i)
                }}
                className={gameQuestion.classString}
              >
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