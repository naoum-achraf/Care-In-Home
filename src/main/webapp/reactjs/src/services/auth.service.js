import axios from "axios";
import { Route, Redirect } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, age, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      age,
      password,
      role:["patient"]
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
}

export default new AuthService();
