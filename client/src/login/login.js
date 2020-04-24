import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

export default class LoginForm extends React.Component {
  render() {
    return (
      <div class="bg-gradient-primary">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                  <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image">
                    <img src="https://avatars1.githubusercontent.com/u/20296778?s=400&amp;u=c65249f84104b51a28b6edb097897940993adb12&amp;v=4"/>
                    </div>
                    <div class="col-lg-6">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Welcome Flowers Management</h1>
                        </div>
                        <div class="form-group">
                          <input type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                        </div>
                        <div class="form-group">
                          <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                        </div>
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input type="checkbox" class="custom-control-input" id="customCheck" />
                            <label class="custom-control-label" for="customCheck">Remember Me</label>
                          </div>
                        </div>
                        <a href="/dashboard" class="btn btn-primary btn-user btn-block">Login </a>
                        <a class="btn btn-success btn-user btn-block">
                        <i class="fab fa-google"></i> Login with Google</a>
                        <a class="btn btn-primary active btn-user btn-block">
                        <i class="fab fa-facebook"></i>Login with Facebook</a>
                        <div class="text-center">
                          <a class="small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                        <div class="text-center">
                          <a class="small" href="register.html">Create an Account!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
