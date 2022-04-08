import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveToken } from '../actions';
import tokenRequest from '../API/tokenReques';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
      isSaveButtonDisabled: true,
      score: 0,
    };
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState(({
      [name]: value,
    }), () => {
      this.isSaveButtonDisabled();
    });
  }

  isSaveButtonDisabled = () => {
    const {
      name,
      gravatarEmail,
    } = this.state;

    const min = 1;

    if (name.length >= min
      && gravatarEmail.length >= min) {
      this.setState((previous) => ({
        ...previous,
        isSaveButtonDisabled: false,
      }));
    } else {
      this.setState((previous) => ({
        ...previous,
        isSaveButtonDisabled: true,
      }));
    }
  }

  handleCLick = async () => {
    const { name, gravatarEmail, score } = this.state;
    const { tokenSave, history } = this.props;
    const data = await tokenRequest();
    const tokenData = data.token;
    const arrayParam = [tokenData, name, gravatarEmail, score];
    tokenSave(arrayParam);
    history.push('/trivia');
  }

  handleCLickToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { isSaveButtonDisabled, name, gravatarEmail } = this.state;
    return (
      <div>
        <div>
          <img
            src={ logo }
            className="App-logo"
            alt="logo"
          />
        </div>
        <div className="input-group mb-5">
          <input
            name="name"
            data-testid="input-player-name"
            placeholder="nome"
            className="form-control"
            value={ name }
            onChange={ this.onInputChange }
          />
          <input
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            placeholder="email"
            className="form-control"
            value={ gravatarEmail }
            onChange={ this.onInputChange }
          />
          <input
            type="button"
            value="Play"
            data-testid="btn-play"
            className="btn btn-primary"
            disabled={ isSaveButtonDisabled }
            onClick={ this.handleCLick }
          />
          <input
            type="button"
            value="Settings"
            data-testid="btn-settings"
            className="btn btn-primary"
            onClick={ this.handleCLickToSettings }
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  tokenSave: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  tokenSave: (token) => dispatch(saveToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
