import { Component } from 'react';

class UserNameForm extends Component {
  render() {
    return(
      <form className={`userNameForm ${this.props.name ? "hidden" : ""} `} action="">
        <label htmlFor="">Enter Your Name</label>
        <input
          // name for input, link to label
          type="text"
          onChange={(e)=>{this.props.nameInput(e)}}
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