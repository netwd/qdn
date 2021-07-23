import axios from 'axios';

export default class Api {
    constructor() {
      this.api_token = null;
      this.client = null;
      this.api_url = 'https://dc9h6qmsoymbq.cloudfront.net/api/';
    }
  
    init = (aT = null) => {
      this.api_token = aT

      let headers = {
        Accept: "application/json",
      };
  
      if (this.api_token) {
        headers.authorization = `${this.api_token}`;
        headers.Host = 'dc9h6qmsoymbq.cloudfront.net';
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

    // ME //
    get_Membership_Info = (aT) => {
        return this.init(aT).get("me/membership");
    };

    // CONTENT //
    get_radio = (params) => {
      return this.init().get("content/radio");
    };
  
    get_homepage = (params) => {
      return this.init().get("content/homepage?slug=home");
    };

    get_Acts = (params) => {
        return this.init().get("content/acts");
    };

    get_Videos = (params) => {
        return this.init().get("content/videos?limit=100");
    };

    get_Sections = (params) => {
        return this.init().get("content/sections");
    };

    get_Library = (params) => {
        return this.init().get("content/section/library");
    };

    get_Library_Events = (params) => {
        return this.init().get("content/section/library-events");
    };

    get_Library_Shows = (params) => {
        return this.init().get("content/section/library-shows");
    };

    get_Library_Sets = (params) => {
        return this.init().get("content/section/library-sets");
    };

    get_Library_Archive = (params) => {
        return this.init().get("content/section/library-archive");
    };

    get_Video_Collection = (collectionID) => {
        return this.init().get("content/video-collections/"+collectionID);
    };
    
    get_Video_Info = (videoID, args=null) => {
        if(args === null) {
            return this.init().get("content/videos/" + videoID);
        } else {
            return this.init().get("content/videos/" + args);
        }        
    };

    get_Related_Videos = (videoID) => {
        return this.init().get("content/videos/" + videoID + "/related");
    };

    get_Stream_URL = (videoID, aT) => {
        return this.init(aT).get("content/videos/" + videoID + "/url");
    };
    get_AudioStream_URL = (videoID, aT) => {
        return this.init(aT).get("content/videos/" + videoID + "/url?audio=1");
    };

    get_Act_Info = (ActID) => {
        return this.init().get("content/acts/" + ActID);
    };

    get_Event_Data = (EventID, args=null) => {
        if(args === null){
            return this.init().get("content/events/" + EventID);
        } else {
            return this.init().get("content/events/" + args);
        }    
    };

    get_Past_Event_Edition = (EventID) => {
        return this.init().get("content/event-editions?event=" + EventID + "&time=past&limit=100&order=dateStart_DESC");
    };

    get_Event_Edition = (EventID, args=null) => {
        if(args === null){
            return this.init().get("content/event-editions/" + EventID);
        } else {
            return this.init().get("content/event-editions/" + args);
        }
    };
    
    get_Event_Timetable = (EventID) => {
        return this.init().get("content/event-editions/" + EventID + "/timetable");
    };

    get_Search = (SearchQuery, args=null) => {
        if(args === null){
            return this.init().get("content/search/video?query=" + SearchQuery);
        } else {
            return this.init().get("content/search/video?query=" + SearchQuery + args);
        }
    };
  }