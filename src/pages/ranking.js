import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRankingLocalStorage();
  }

  getRankingLocalStorage = () => {
    const rankingStorage = localStorage.getItem('ranking');
    const rankingStorageParse = JSON.parse(rankingStorage);
    console.log(rankingStorageParse);
    const rankingSort = rankingStorageParse.sort((a, b) => b.score - a.score);
    this.setState({ ranking: rankingSort });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h2 data-testid="ranking-title"> Ranking</h2>
        {ranking.map((player, index) => (
          <div
            key={ player.name }
          >
            <hr />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testeid={ `player-score-${index}` }>{player.score}</p>
            <hr />
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Tela Inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

export default Ranking;

//  function compare(a, b) {
//    if (a.score < b.score) {
//      return -1;
//    }
//    if (a.score > b.score) {
//      return 1;
//    }
//    return 0;
//  };
//  const sortBooks = ageName.sort(compare);
//  console.table(sortBooks);
