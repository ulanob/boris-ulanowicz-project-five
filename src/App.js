import { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/endangerment.png';
import Input from "./Input.js"

class App extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      userScore: 0,
      isQuestionSelected: false
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
        console.log(this.state.questionsArray);
      })
  }



  handleClick = () => {
    console.log('clicked', this);
    this.setState({
      isQuestionSelected: !this.state.isQuestionSelected
    })
  }

  render() {
    return (
      <div className="App">
        <img src={logo} alt="logo from the famous household game show 'Endangerment'" />
        <div className="gameBoard">
          {
            this.state.questionsArray.map((gameQuestions) => {
              return (
                <div
                  key={gameQuestions.id} 
                  className="question"
                  onClick={this.handleClick}>
                  <p>${gameQuestions.value}</p>
                  <p>{gameQuestions.category.title}</p> 
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
