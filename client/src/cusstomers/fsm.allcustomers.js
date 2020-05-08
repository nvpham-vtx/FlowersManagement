import React, { Component } from 'react';
import UserService from '../services/users.service';

class AllCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {users:  []};
        this.loadView();
    }

    loadView() {
        UserService.getAllUsers()
            .then(response => {
                this.setState({
                    users: response.data
                })
            }).finally(() => {
                console.log();
            })
    }

    render() {
        return (
            <div class="wrapper">
                <div class="content-wrapper">
                    <section className="content">
                        <  div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
                                    </div>
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {this.state.users.map((user, index) => {
                                                   return( <tr>
                                                        <td>{user.ID}</td>
                                                        <td>{user.NAME}</td>
                                                        <td>{user.EMAIL}</td>
                                                        <td>{user.PHONE}</td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default AllCustomer;