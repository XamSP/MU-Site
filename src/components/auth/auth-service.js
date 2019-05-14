import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    });
    this.service = service;
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password}, {withCredentials:true})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/auth/logout', {}, {withCredentials:true})
    .then(response => response.data)
  }

  signup = (username, password, campus, course /*image*/) => {
    return this.service.post('/auth/signup', {username, password, campus, course}, /*image,*/ {withCredentials:true}, {
      headers: {
        'Content-Type': false,
      }
    })
    .then(response => response.data)
  }

  edit = (username, campus, course /*image*/) => {
    return this.service.put('/auth/edit', {username, campus, course}, /*image,*/ {withCredentials:true}, {
      headers: {
        'Content-Type': false,
      }
    })
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin', {withCredentials:true})
    .then(response => response.data)
  }

  upload = (file) => {
    return this.service.post('/auth/upload', file, {withCredentials:true}, {
      headers: {
        'Content-Type': 'multipart/form-data',      }
    })
    .then(response => response.data)
  }

}

export default AuthService;