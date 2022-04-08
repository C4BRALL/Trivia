import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { hashEmail } from '../API/tokenReques';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    this.getUrlImg();
  }

  getUrlImg = async () => {
    const { email } = this.props;
    const dataImg = hashEmail(email);
    this.setState({ hash: dataImg });
  }

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
    return (
      <>
        <img
          src={ logo }
          className="App-logo"
          alt="logo"
        />
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="avatar-profile"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          { name }
        </p>
        <p
          data-testid="header-score"
        >
          { score }
        </p>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
