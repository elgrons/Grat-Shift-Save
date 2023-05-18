import axios from "axios";

class ApiService {
  // API endpoints for authentication
  apiUrl = "https://grat-shift-save-api.azurewebsites.net/api";
  registerEndpoint = "/register";
  loginEndpoint = "/login";

  // Register a new user
  registerUser(userData) {
    return axios.post(`${this.apiUrl}${this.registerEndpoint}`, userData);
  }

  // Log in an existing user
  loginUser(credentials) {
    return axios.post(`${this.apiUrl}${this.loginEndpoint}`, credentials);
  }
}

export default ApiService;