import { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/endangerment.png';
import UserNameForm from './UserNameForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      userName: '',
      userScore: 0,
      // isQuestionSelected: false
    }
    this.handleClick = this.handleClick.bind(this);
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
  getName = () => {
    // this.setState({
    //   userName = 
    // })
  }

  handleClick = () => {
    console.log('clicked');
    console.log(this);
    console.log(this.gameQuestion.id);
    // find question that was clicked on
    // append question, and a form that takes user input
  }

  render() {
    return (
      <div className="App">
        <img src={logo} alt="logo from the famous household game show 'Endangerment'" />
        <UserNameForm />
        <div className="gameBoard">
          {
            this.state.questionsArray.map((gameQuestion) => {
              return (
                <div
                  key={gameQuestion.id}
                  className="question"
                  onClick={this.handleClick}>
                  <p><span>$</span>{gameQuestion.value}</p>
                  <p>{gameQuestion.category.title}</p>
                </div>
              )
            })
          }
        </div>
        <div className="userInput">

        </div>
      </div>
    );
  }
}

export default App;
