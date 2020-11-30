import { Component } from 'react';

class UserAnswer extends Component {
  render() {
    // const { index, questions, takeAnswer } = this.props;
    console.log(this.props);
    return(
      <form action="">
        {/* <label htmlFor="getUserAnswer">{questions[index].question}</label>
        <input type="text" placeholder="What is..." name="userAnswer" />
        <button type="submit" onClick={takeAnswer}>Submit</button> */}
      </form>
    )
  }
}

export default UserAnswer;