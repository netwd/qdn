import axios from 'axios';

export default class MessageAPI {
    constructor() {
      this.api_token = null;
      this.client = null;
      this.api_url = 'https://members.id-t.com/api/me/messaging/'
    }
  
    init = (aT = null) => {
      this.api_token = aT

      let headers = {
        Accept: "application/json",
      };
  
      if (this.api_token) {
        headers.authorization = `${this.api_token}`;
        headers.accept = 'application/json, text/plain, */*';
        headers.brand = 'qdance';
      }

      this.client = axios.create({
        baseURL: this.api_url,
        timeout: 31000,
        headers: headers,
      });
  
      return this.client;
    };

    obtainMessages = (aT) => {
        return this.init(aT).get("messages");
    };

    obtainRead = (aT) => {
      return this.init(aT).get("info");
    };
  
    obtainMessageInfo = (aT, slug) => {
        return this.init(aT).get("messages/"+slug);
    };

  }
