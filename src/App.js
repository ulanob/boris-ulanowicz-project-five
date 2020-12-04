import { Component } from 'react';
import './App.css';
import axios from 'axios';
import firebase from './firebase.js';
import logo from './assets/endangerment.png';
import UserNameForm from './UserNameForm';
import GameBoard from './GameBoard.js';
import Leaderboard from './Leaderboard.js';

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
      buttonDisplay: '',
      leaderboard: []
    }
  }

  componentDidMount() {
    // API Call
    axios({
      url: `https://jservice.io/api/random`,
      method: `GET`,
      responseType: `json`,
      params: {
        count: 20
      }
    }).then((res) => {
      // some question objects in the response have a value of null, so I'm changing the value to 200 here:
      const fixQuestionsArray = res.data.map((object) => {
        let objectValue = object.value
        if (object.value == null) {
          objectValue = 200
        }
        const newObject = {
          value: objectValue,
          classString: 'question'
        }
        return { ...object, ...newObject }
      })
      this.setState({
        questionsArray: fixQuestionsArray
      })
    })
    // Firebase
    const dbRef = firebase.database().ref();
    dbRef.on('value', (data) => {
      const firebaseDataObj = data.val();
      const processedScores = [];
      for (let key in firebaseDataObj) {
        const formattedObj = {
          id: key,
          score: firebaseDataObj[key].score,
          name: firebaseDataObj[key].userName
        }
        processedScores.push(formattedObj)
        // sorting users' scores:
        const sortedNames = processedScores.sort((a, b) => {
          return [b.score] - [a.score]
        })
        this.setState({
          leaderboard: sortedNames
        })
      }
    })
  }

  handleNameInputChange = (e) => {
    this.setState({
      userNameInput: e.target.value
    })
  }

  takeUserName = () => {
    this.setState({
      userName: this.state.userNameInput.trim(),
    })
  }

  handleClick = (i) => {
    this.setState({
      currentIndex: i,
      currentQuestion: this.state.questionsArray[i].question,
      isBoxVisible: this.state.isBoxVisible = true,
      buttonDisplay: ''
    })
  }

  handleInputChange = (e) => {
    this.setState({
      userAnswerInput: e.target.value,
    })
  }

  // for some reason, userSubmittedAnswer only changes on the second button click... because of this, I had to repeat a lot code in both options in the conditional
  evaluate = () => {
    this.setState({
      userSubmittedAnswer: this.state.userAnswerInput.toLowerCase(),
    })

    const userAnswer = this.state.userSubmittedAnswer.toLowerCase();

    const actualAnswer = this.state.questionsArray[this.state.currentIndex].answer.toLowerCase();

    const i = this.state.currentIndex;

    const questionValue = this.state.questionsArray[this.state.currentIndex].value

    const questionsArrayClone = [... this.state.questionsArray];

    // add to correct array, alert results, clear input and submitted answer state, hide submit button, add pointer-events: none to selected div
    
    if (userAnswer !== '' && userAnswer == actualAnswer) {
      // correct answer response
      alert('Correct!')
      questionsArrayClone[i].classString = "question correct";
      this.setState({
        userScore: this.state.userScore + questionValue,
        userAnswerInput: '',
        userSubmittedAnswer: '',
        buttonDisplay: 'hidden'
      })
    } else if (userAnswer !== '' && userAnswer !== actualAnswer) {
      // incorrect answer response
      questionsArrayClone[i].classString = "question incorrect";
      alert(`Bzzt! Correct answer is: ${actualAnswer}`)
      this.setState({
        userScore: this.state.userScore - questionValue,
        userAnswerInput: '',
        userSubmittedAnswer: '',
        buttonDisplay: 'hidden'
      })
    }
  }

  finalScoreSubmit = (e) => {
    e.preventDefault();
    const userNameAndScore = {
      userName: `${this.state.userName}`,
      score: this.state.userScore
    }
    const dbRef = firebase.database().ref();
    dbRef.push(userNameAndScore);
  }


  render() {
    return (
      <div className="App">
        <img src={logo} alt="logo from the famous household game show 'Endangerment'" />
        <UserNameForm
          name={this.state.userName}
          nameInput={(e) => { this.handleNameInputChange(e) }}
          takeUserName={this.takeUserName} />
        <GameBoard
          userName={this.state.userName}
          questionsArray={this.state.questionsArray}
          handleClick={(i) => { this.handleClick(i) }}
        />

        <div className="playArea">
          <div className="userBooth" >
            <p className={
              `${this.state.isBoxVisible ? "" : "hidden"}`
            }
            >${this.state.userScore}</p>

            {/* h2 below greets the user first, then is recycled to display userName during gameplay */}
            <h2>{
              this.state.userName ? this.state.userName : "Welcome to Endangerment! Now entering the studio is today's contestant: You!"
            }</h2>
          </div>

          <div
            className={`userInput ${this.state.isBoxVisible ? "" : "hidden"}`}
          >
            <form onSubmit={(e) => {
              e.preventDefault();
              this.evaluate();
            }}>
              <label htmlFor="questionInput">{this.state.currentQuestion}</label>
              <input
                id="questionInput"
                name="questionInput"
                placeholder="What is..."
                type="text"
                value={this.state.userAnswerInput}
                onChange={(e) => {
                  this.handleInputChange(e);
                }} />
              <button type="submit" className={this.state.buttonDisplay}
              >Answer</button>
            </form>
          </div>
        </div>

        <form 
          onSubmit={this.finalScoreSubmit} 
          className={`finalScoreForm ${this.state.userName ? "" : "hidden"}`}
          >
          <button>Get on the Leaderboard!</button>
        </form>
        <Leaderboard array={this.state.leaderboard} />
      </div>
    );
  }
}
export default App;