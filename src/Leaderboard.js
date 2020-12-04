import { Component } from 'react';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        {
          this.props.array.map((entry) => {
            return (
              <p key={entry.id}>{entry.name}: {entry.score}</p>
            )
          })
        }
      </div>
    )
  }
}

export default Leaderboard;