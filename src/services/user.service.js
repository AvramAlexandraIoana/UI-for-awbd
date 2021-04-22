import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const API_COUNTRY = 'http://localhost:8080/api/country'

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getCountryList() {
    return axios.get(API_COUNTRY + '/list', { headers: authHeader() });
  }

  createNewCountryAdmin(data) {
    return axios.post(API_COUNTRY, data, { headers: authHeader() });
  }

  getCountryAdmin(id) {
    return axios.get(API_COUNTRY + '/' + id, { headers: authHeader() });
  }

  updateCountryAdmin(data) {
    return axios.put(API_COUNTRY + '/' + data.id, data, { headers: authHeader() });
  }
}

export default new UserService();