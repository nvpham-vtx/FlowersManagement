import axios from "axios";

export default class UserService {
    static getAllUsers() {
       return axios.get('/api/users')
            .then(response => {
               return response.data;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                console.log();
            })
    }
}