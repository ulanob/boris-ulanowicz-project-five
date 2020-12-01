import { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/endangerment.png';
import UserNameForm from './UserNameForm';
// import UserAnswer from './UserAnswer';
// import Question from './Question';

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
      // takeAnswer: ()=>{}
    }
  }

  componentDidMount() {
    axios({
      url: `http://jservice.io/api/random`,
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
  getName = (e) => {
    e.preventDefault();
    console.log('clicked');
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
    console.log(this.state.userAnswerInput)
  }

  takeAnswer = (e) => {
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
      console.log(this.state.userScore);
    }
  }

  render() {
    return (
      <div className="App">
        <img src={logo} alt="logo from the famous household game show 'Endangerment'" />
        <UserNameForm takeName={this.getName} />
        <div className="gameBoard">
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
          <div
            className={`userBooth ${this.state.isBoxVisible ? "" : "hidden"}`}>
            <p>${this.state.userScore}</p>
            {this.state.userName}
          </div>

          <div
            className={`userInput ${this.state.isBoxVisible ? "" : "hidden"}`}
          >
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
              }}>Submit</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
