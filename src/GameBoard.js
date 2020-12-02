import { Component } from 'react';

class GameBoard extends Component {
  


  render() {
    return(
       <div className={`gameBoard ${this.props.userName ? "" : "hidden"}`}>
          {/* add conditional: if this.state.userName !== '' then add className hidden */}
          {
            this.props.questionsArray.map((gameQuestion, i) => {
              // const resultOfAddClass = this.props.addClass(i);
              // console.log(resultOfAddClass);

              return (
                <div
                  key={gameQuestion.id}
                  // id={i}
                  onClick={(e) => { 
                    this.props.handleClick(i) 
                    this.props.addClass(i, e)
                  }}

                  className={`question question${i}`}

                  // className={`question question${i} 
                  // ${resultOf ? "answered" : ""}

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