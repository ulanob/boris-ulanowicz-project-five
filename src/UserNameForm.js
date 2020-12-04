import { Component } from 'react';

class UserNameForm extends Component {
  render() {
    return (
      <form className={`userNameForm ${this.props.name ? "hidden" : ""} `} action="" required>
        <label htmlFor="nameInput">Enter Your Name</label>
        <input
          id="nameInput"
          name="nameInput"
          type="text"
          onChange={(e) => { this.props.nameInput(e) }}
        />
        <button onClick={(e) => {
          e.preventDefault();
          this.props.takeUserName();
        }}>Enter</button>
      </form>
    )
  }
}

export default UserNameForm;