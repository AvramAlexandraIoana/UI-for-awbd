import axios from 'axios';
import authHeader from './auth-header';

const API_INFO = 'http://localhost:8080/api/info';

class InfoService {
  upload(item) {
    // let formData = new FormData();

    // formData.append("file", item.file);

    return axios.post(API_INFO + '/upload', item.imageData, { headers: authHeader()  });
  }


  getInfo(id) {
    return axios.get(API_INFO + '/location/getImage/' + id, { headers: authHeader() + 'responseType: blob'});

  }
}

export default new InfoService();