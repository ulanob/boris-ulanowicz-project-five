import { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/endangerment.png';
import UserNameForm from './UserNameForm';
// import UserAnswer from './UserAnswer';
import GameBoard from './GameBoard.js';
import firebase from './firebase.js';
import Leaderboard from './Leaderboard.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      answeredArray: [],
      correctAnswers: [],
      incorrectAnswers: [],
      userNameInput: '',
      userName: '',
      userAnswerInput: '',
      userSubmittedAnswer: '',
      userScore: 0,
      currentQuestion: '',
      currentIndex: null,
      isBoxVisible: false,
      isAnswered: false,
      leaderboard: [],
      // scores: {}
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
  // Connecting Firebase
    const dbRef = firebase.database().ref();
    dbRef.on('value', (data) => {
      const firebaseDataObj = data.val();
      console.log(firebaseDataObj)
      const processedScores = [];
      for (let key in firebaseDataObj) {
        const formattedObj = {
          id: key,
          score: firebaseDataObj[key].score,
          name: firebaseDataObj[key].userName
        }
        processedScores.push(formattedObj)
        // console.log(processedScores)
        const sortedNames = processedScores.sort((a, b) => {
          return [b.score] - [a.score]
        })
        // console.log(sortedNames)
        this.setState({
          leaderboard: sortedNames
        })
      }
      console.log(this.state.leaderboard);





      // const sortedScores = Object.values(firebaseDataObj).sort((a,b)=> {
      //   return firebaseDataObj[a] - firebaseDataObj[b]
      // });
      // console.log(sortedScores);
      
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
      isBoxVisible: this.state.isBoxVisible = true
    })
    // console.log(this.state.currentIndex)

    // push string of 'currentIndex' to answeredArray in state 
    const array = this.state.answeredArray;
    array.push(`${this.state.currentIndex}`);
    this.setState({
      answeredArray: array
    })
    console.log(this.state.answeredArray)
  }

  addClass = (i, e) => {
    // using indexOf to check if currentIndex is in answeredArray
    let findIndex = this.state.answeredArray.indexOf(`${i}`);
    console.log(findIndex, i, this.state.answeredArray);
    if ((findIndex > -1) && (e.target.id == i)) {
      // yes, current index number is in the answers array
      return true;
      // this.setState({
      //   isAnswered: true,
      // })
    } else {
      return false;
      // this.setState({
      //   isAnswered: false
      // })
    }
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
      // add to correct array
    } else if (this.state.userSubmittedAnswer !== this.state.questionsArray[this.state.currentIndex].answer.trim().toLowerCase()) {
      this.setState({
        userScore: this.state.userScore - this.state.questionsArray[this.state.currentIndex].value
      })
      // add to incorrect array
    }

  }

  finalScoreSubmit = (e) => {
    e.preventDefault();
    const userNameAndScore = {
      userName: `${this.state.userName}`,
      score: this.state.userScore
    }

    console.log(userNameAndScore);
    const dbRef = firebase.database().ref();
    dbRef.push(userNameAndScore);
  }


  render() {
    return (
      <div className="App">

        <img src={logo} alt="logo from the famous household game show 'Endangerment'" />

        <UserNameForm
          nameInput={(e) => { this.handleNameInputChange(e) }}
          takeUserName={this.takeUserName} />

        <GameBoard
          userName={this.state.userName}
          questionsArray={this.state.questionsArray}
          handleClick={(i) => { this.handleClick(i) }}
          addClass={(i, e) => { this.addClass(i, e) }}
          isAnswered={this.state.isAnswered}
        />

        <div className="playArea">
          {/* component can go in here, put visibility conditional in classname above */}

          <div
            // className={`userBooth ${this.state.isBoxVisible ? "" : "hidden"}`}>
            className="userBooth">
            <p className={`${this.state.isBoxVisible ? "" : "hidden"}`}>${this.state.userScore}</p>
            <h2>{this.state.userName ? this.state.userName : "Welcome to Endangerment! Now entering the studio is today's contestant: You!"}</h2>
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
        <form onSubmit={this.finalScoreSubmit} className={`finalScoreForm ${this.state.userName ? "" : "hidden"}`}>
          <label htmlFor=""></label>
          <button>Get on the Leaderboard</button>
        </form>
        <Leaderboard array={this.state.leaderboard}/>
      </div>
    );
  }
}

export default App;