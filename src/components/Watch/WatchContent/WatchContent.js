import React from 'react';
import 'video.js/dist/video-js.css';
import Hls from "hls.js";



export default class WatchContent extends React.Component {

    state = {};
    
    async componentDidMount() {
        if (Hls.isSupported() && this.player) {
            const video = this.player;
            const hls = new Hls();
            
            hls.loadSource(
                this.props.videoId
            );
            
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() { 
                
            });
            
        }

    }
   
    render() {
        
    if (!this.props.videoId) {
      return <div/>
    }
    
    return (
        <div>
            <div className="video-container">
                <br/>
                <video className='video' id='VideoStream' class="rounded-lg border-yellow-600" Width={"800px"} preload="none" ref={player => (this.player = player)} preload="none" controls/>
                <br/>
            </div>

        </div>
    );
  }
  shouldShowLoader() {
    return !!this.props.nextPageToken;
  }
}