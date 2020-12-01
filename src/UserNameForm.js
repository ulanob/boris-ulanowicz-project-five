import { Component } from 'react';

class UserNameForm extends Component {
  render() {
    return(
      <form className="userNameForm" action="">
        <label htmlFor="getUserName">What is your Name?</label>
        <input type="text" name="userName"/>
        <button type="submit" onClick={this.props.getName}>Submit</button>
      </form>
    )
  }
}

export default UserNameForm;