import { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/endangerment.png';

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

  handleClick = (e, data) => {
    console.log('clicked');
    console.log(this);
    console.log(e, data);
    // find question that was clicked on
    // append question, and a form that takes user input
  }

  render() {
    return (
      <div className="App">
        <img src={logo} alt="logo from the famous household game show 'Endangerment'" />
        <form action="">
          <label htmlFor="getUserName" onClick={this.getName}>What is your Name</label>
          <input type="text" name="userName"/>
          <button type="submit"></button>
        </form>
        <div className="gameBoard">
          {
            this.state.questionsArray.map((gameQuestion) => {
              return (
                <div
                  key={gameQuestion.id}
                  className="question"
                  onClick={this.handleClick, console.log(this)}>
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
