import { Component } from 'react';

class UserNameForm extends Component {
  render() {
    return(
      <form action="">
        <label htmlFor="">Enter Your Name</label>
        <input
          // name for input, link to label
          type="text"
          onChange={(e)=>{this.props.nameInput(e)}}
        />
        <button onClick={(e) => {
          e.preventDefault();
          this.props.takeUserName();
        }}>Submit</button>
      </form>
    )
  }
}

export default UserNameForm;