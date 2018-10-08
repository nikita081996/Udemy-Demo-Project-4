import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { onEmailChanged, onPasswordChanged, loginUser } from '../actions';

class LoginForm extends Component {
  onButtonPress() {
    const { email, password } = this.props;
    this.props.error = '';
    Keyboard.dismiss();
    this.props.loginUser({ email, password });
  }

  emailChanged(text) {
    this.props.onEmailChanged(text);
  }
  passwordChanged(text) {
    this.props.onPasswordChanged(text);
  }

  renderError() {
    if (this.props.error) {
      return (
        <View styles={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="abd@gmail.com"
            value={this.props.email}
            onChangeText={this.emailChanged.bind(this)}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.props.password}
            onChangeText={this.passwordChanged.bind(this)}
          />
        </CardSection>
        {this.renderError()}
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(
  mapStateToProps,
  { onEmailChanged, onPasswordChanged, loginUser }
)(LoginForm);
