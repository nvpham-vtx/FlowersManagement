import React from 'react';
import { withRouter } from "react-router-dom";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import UserService from '../services/users.service';
import Commom from '../commom/commom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      blocking: false,
      isShow: false,
    };
  }

  changeEmail(self) {
    this.setState({
      email: self.target.value,
    })
  }

  changePassword(self) {
    this.setState({
      password: self.target.value,
    })
  }

  loginPage() {
    this.setState({ blocking: !this.state.blocking });
    let commom = new Commom();
    let email = this.state.email;
    let password = this.state.password;
    UserService.authenticateUser(email, password)
      .then(response => {
        commom.setSessionStorage(response.headers['x-access-token'], response.data.user.EMAIL); 
        this.setState({ blocking: !this.state.blocking });     
        this.props.history.push('/dashboard');
      }).catch((error) => {
        console.log(error);
        this.setState({isShow:  true});
        this.setState({ blocking: !this.state.blocking });
      })
      .finally(() => {
       
      })
  }

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking}>
        <div class="hold-transition login-page">
          <div class="login-box">
            <div class="card">
              <div class="card-body login-card-body">
                <p class="login-box-msg"><h3>Flowers Management</h3></p>
                <div class="input-group mb-3">
                  <input type="email" value={this.state.email} onChange={this.changeEmail.bind(this)} class="form-control" placeholder="Email" />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-envelope"></span>
                    </div>
                  </div>
                  {this.state.isShow ? <span style={{color: 'red'}}>Invalid email</span> : null}
                </div>
                <div class="input-group mb-3">
                  <input type="password" class="form-control" onChange={this.changePassword.bind(this)} value={this.state.password} placeholder="Password" />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-8">
                    <div class="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label for="remember">
                        Remember Me
              </label>
                    </div>
                  </div>
                  <div class="col-4">
                    <button onClick={this.loginPage.bind(this)} class="btn btn-primary btn-block">Sign In</button>
                  </div>
                </div>
                <div class="social-auth-links text-center mb-3">
                  <p>- OR -</p>
                  <a href="#" class="btn btn-block btn-primary">
                    <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
                  <a href="#" class="btn btn-block btn-danger">
                    <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>
                </div>
                <p class="mb-1">
                  <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p class="mb-0">
                  <a href="register.html" class="text-center">Register a new membership</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </BlockUi>
    );
  }
}

export default withRouter(LoginForm);
