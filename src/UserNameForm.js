import { Component } from 'react';

class UserNameForm extends Component {
  render() {
    return(
      <form action="">
        <label htmlFor="getUserName" onClick={this.getName}>What is your Name</label>
        <input type="text" name="userName" />
        <button type="submit"></button>
      </form>
    )
  }
}

export default UserNameForm;