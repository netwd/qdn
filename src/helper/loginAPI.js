import axios from 'axios';

export default class loginAPI {
    constructor() {
      this.client = null;
      this.api_url = 'https://members.id-t.com/api/auth/';
      this.data = null
    }
  
    init = () => {

      let headers = {
        'brand': 'qdance',
        'content-type': 'application/json;charset=utf-8'
      };
      
      this.client = axios.create({
        baseURL: this.api_url,
        timeout: 31000,
        headers: headers
      });

      return this.client;
    };

    standard = (mail,pass) => {
        return this.init().post("login", {"email":mail,"password":pass});
    };

    ssoToken = (ssoToken) => {
        return this.init().post("login", {"loginToken":ssoToken});
    };

    refreshToken = (refreshToken) => {
        return this.init().post("login", {"refreshToken":refreshToken});
    };

    obtain_login_mail = (mail) => {
        return this.init().post("login-token", {"email":mail, "destination":"https://app-login.q-dance.com/Home"});
    };

  }