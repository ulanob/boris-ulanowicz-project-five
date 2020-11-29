import { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/endangerment.png';
import { render } from '@testing-library/react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: []
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
        this.setState({
          questionsArray: res.data
        })
        // console.log(this.state.questionsArray)
      })
  }

  handleClick = () => {
    console.log('clicked')
    return (
      <p>Hello</p>
    )
  }

  formatValue = (value) => {
    if (value == null) {
      return value = 200
    } else {
      return value
    }
  }



  render() {
    return (
      <div className="App">
        <img src={logo} alt="the famous endangerment logo" />
        {
          this.state.questionsArray.map((i) => {
            return (
              <div key="this.state.questionsArray.id" className="questionBox">
                <p onClick={this.handleClick}>${this.formatValue(i.value)}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
