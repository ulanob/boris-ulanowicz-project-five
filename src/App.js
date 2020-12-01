import { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/endangerment.png';
import UserNameForm from './UserNameForm';
// import UserAnswer from './UserAnswer';
import GameBoard from './GameBoard.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      userNameInput: '',
      userName: '',
      userAnswerInput: '',
      userSubmittedAnswer: '',
      userScore: 0,
      currentQuestion: '',
      currentIndex: null,
      isBoxVisible: false,
    }
  }

  componentDidMount() {
    axios({
      url: `https://jservice.io/api/random`,
      method: `GET`,
      responseType: `json`,
      params: {
        count: 20
      }
    })
      .then((res) => {
        let fixQuestionsArray = res.data;
        // some question objects have a value of null, so changing them to 200
        fixQuestionsArray.filter((object) => {
          if (object.value == null) {
            object.value = 200
          }
          this.setState({
            questionsArray: fixQuestionsArray
          })
        })
        // console.log(this.state.questionsArray);
      })
  }
  handleNameInputChange = (e) => {
    this.setState({
      userNameInput: e.target.value
    })
  }
  takeUserName = () => {
    this.setState({
      userName: this.state.userNameInput.trim()
    })
  }

  handleClick = (i) => {
    this.setState({
      currentIndex: i,
      currentQuestion: this.state.questionsArray[i].question,
      isBoxVisible: this.state.isBoxVisible = true,
    })
  }

  handleInputChange = (e) => {
    this.setState({
      userAnswerInput: e.target.value
    })
    // console.log(this.state.userAnswerInput)
  }

  takeAnswer = () => {
    this.setState({
      userSubmittedAnswer: this.state.userAnswerInput.trim().toLowerCase()
    })
    // how come it only updates after second click?
    console.log(this.state.userSubmittedAnswer)
  }

  evaluate = () => {
    if (this.state.userSubmittedAnswer == this.state.questionsArray[this.state.currentIndex].answer.trim().toLowerCase()) {
      console.log('correct')
      this.setState({
        userScore: this.state.userScore + this.state.questionsArray[this.state.currentIndex].value
      })
    } else if (this.state.userSubmittedAnswer !== this.state.questionsArray[this.state.currentIndex].answer.trim().toLowerCase()) {
      this.setState({
        userScore: this.state.userScore - this.state.questionsArray[this.state.currentIndex].value
      })
    }

  }

  render() {
    return (
      <div className="App">

        <img src={logo} alt="logo from the famous household game show 'Endangerment'" />

        <UserNameForm 
          nameInput={(e)=>{this.handleNameInputChange(e)}} 
          takeUserName={this.takeUserName}/>

        {/* <GameBoard 
          userName={this.state.userName}
          questionsArray={this.state.questionsArray}
          handleClick={(i)=>{this.handleClick(i)}}
        /> */}


        <div className={`gameBoard ${this.state.userName ? "" : "hidden"}`}>
          {/* add conditional: if this.state.userName !== '' then add className hidden */}
          {
            this.state.questionsArray.map((gameQuestion, i) => {
              return (
                <div
                  key={gameQuestion.id}
                  className={`question question${i}`}
                  onClick={() => { this.handleClick(i) }}>
                  <p><span>$</span>{gameQuestion.value}</p>
                  <p>{gameQuestion.category.title}</p>
                </div>
              )
            })
          }
        </div> 





        <div className="playArea">
          {/* component can go in here, put visibility conditional in classname above */}

          <div
            // className={`userBooth ${this.state.isBoxVisible ? "" : "hidden"}`}>
            className="userBooth">
            <p className={`${this.state.isBoxVisible ? "" : "hidden"}`}>${this.state.userScore}</p>
            <h2>{this.state.userName? this.state.userName : "Welcome to Endangerment! Now entering the studio is today's contestant: you!"}</h2>
          </div>

          <div
            className={`userInput ${this.state.isBoxVisible ? "" : "hidden"}`}
          >
            {/* add category and value here? */}
            <form action="">
              <label htmlFor="">{this.state.currentQuestion}</label>
              <input
                placeholder="What is..."
                type="text"
                onChange={(e) => { this.handleInputChange(e) }}
              />
              <button onClick={(e) => {
                e.preventDefault();
                this.takeAnswer();
                this.evaluate();
              }}>Answer</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
