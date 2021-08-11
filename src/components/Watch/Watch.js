  
import React from 'react';
import WatchContent from './WatchContent/WatchContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import Api from "../../../src/helper/api";

export class Watch extends React.Component {
  state = {
    loading: true,
    vidURL: null,
    thumbnail: null,
    permission: null,
    TL: null,
    share_URL: null
  }
  
  async componentDidMount() {
    const api = new Api();
    let aT = sessionStorage.getItem('accessToken')
    let level = sessionStorage.getItem('level')
    
    const VideoID = this.props.videoId
    const FirstSearchResult = "https://www.1001tracklists.com"+ this.props.first_search
    const url_level = api.get_Video_Info(VideoID);
    const response_level = await url_level
    const data_level = await response_level.data
    

    if(data_level.data.subscription.level <= level) {
      const url = api.get_Stream_URL(VideoID, aT);
      const response = await url
      const data = await response.data
      
      this.setState({vidURL: data.data.url, loading: false, thumbnail: data_level.data.thumbnail, permission: true, TL: FirstSearchResult, share_URL: "https://share.q-dance.com/?video="+this.props.videoId});
    } else {
      this.setState({loading: true, permission: false})
    }

    
  }
  render() {

    
    return (
      <div>
        {this.state.loading ? 
          <div>
          {this.state.permission !== null ?
            <div><br/>You don't have permission to watch this video.</div> : <LinearProgress />
          }
          </div> 
          :
          <div>
              <div>
                <center>
                  <WatchContent videoId={this.state.vidURL} thumbnail={this.state.thumbnail}/>
                </center>
                <Typography gutterBottom align="left">
                <ul class="list-none md:list-disc">
                  <li><a href={this.state.share_URL} target="_blank"> <u>Share</u> </a></li>
                  <li><a href={this.state.TL} target="_blank"> <u>Tracklist</u> <small>(beta)</small></a></li>
                </ul>
                </Typography> 
               
              </div>
          </div>
        }
      </div>
    );
  }
}