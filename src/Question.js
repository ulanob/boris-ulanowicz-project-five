import { Component } from 'react';

class Question extends Component {
  render() {
    return(
      <div
        key={gameQuestion.id}
        className="question"
        onClick={this.handleClick}>
        <p><span>$</span>{gameQuestion.value}</p>
        <p>{gameQuestion.category.title}</p>
      </div>
    )
  }
}

export default Question;