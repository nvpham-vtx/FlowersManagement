import axios from "axios";

export default class UserService {
    static getAllUsers() {
       return axios.get('/api/users');
    }

    static authenticateUser(email, password) {
        return axios.post('/api/signin', {email, password});
    }
}