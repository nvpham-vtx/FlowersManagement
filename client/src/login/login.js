import React from 'react';
import UserService from '../services/users.service';

export default class LoginForm extends React.Component {
  loginPage() {
    UserService.getAllUsers()
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return (
      <div class="hold-transition login-page">
        <div class="login-box">
          <div class="card">
            <div class="card-body login-card-body">
              <p class="login-box-msg"><h3>Flowers Management</h3></p>
              <div class="input-group mb-3">
                <input type="email" class="form-control" placeholder="Email" />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="Password" />
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
                  <button onClick={this.loginPage} class="btn btn-primary btn-block">Sign In</button>
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
    );
  }
}
