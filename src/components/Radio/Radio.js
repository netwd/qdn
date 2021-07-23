import React from 'react';
import Hls from "hls.js";
import Api from "../../../src/helper/api";
import { setIntervalAsync } from 'set-interval-async/dynamic';

export default class RadioContent extends React.Component {

    state = {};
    
    async componentDidMount() {
        if (Hls.isSupported() && this.player) {
            const video = this.player;
            const hls = new Hls();
            
            hls.loadSource(
                this.props.url
            );
            
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() { video.play(); });
        }
        const api = new Api();

        async function obtain_data() {
            const res = await api.get_radio()
            const json = await res.data
            console.log(json)
            return json.data
        }

        this.interval = setIntervalAsync( async () => {
            const new_data = await obtain_data()
            
            document.getElementById("coverArt").src = new_data.trackData.nowPlaying.coverImageUrl;
            document.getElementById("spotifyURI").href = "https://open.spotify.com/track/"+new_data.trackData.nowPlaying.spotifyId.toString();
            document.getElementById("title").innerHTML = new_data.trackData.nowPlaying.title;
            document.getElementById("act").innerHTML = new_data.trackData.nowPlaying.act.name;            
        }, 5000);
    }
   
    render() {
    
    
    const play_pause = (e) =>  { 
        const radioPlayer = document.getElementById("radioStream");
        if(radioPlayer.paused) {
            radioPlayer.play()
        } else {
            radioPlayer.pause()
        }
    }

    const updateVolume = (e) => {
        const radioPlayer = document.getElementById("radioStream");
        radioPlayer.volume = e.target.value/100
    }

    if (!this.props.url) {
      return <div/>
    }
    
    return (
        <div>
            <div className="video-container row-span-2 col-span-2">
            <div class="bg-gray-800 rounded-tl-xl sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
            <div class="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
                <img src={this.props.data.trackData.nowPlaying.coverImageUrl} id="coverArt" alt="" width="160" height="160" class="flex-none w-20 h-20 rounded-lg bg-gray-100" />
                <div class="min-w-0 flex-auto space-y-0.5">
                <h2 id="title" class="text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold truncate">
                {this.props.data.trackData.nowPlaying.title}
                </h2>
                <p id="act" class="text-gray-400 text-base sm:text-lg lg:text-base xl:text-lg font-medium">
                {this.props.data.trackData.nowPlaying.act.name}
                </p>
                </div>
            </div>
            </div>
            <div class="content-center bg-gray-50 bg-gray-900 text-white lg:rounded-b-xl py-4 px-1 sm:px-3 lg:px-1 xl:px-3 grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 items-center">

            <button type="button" class="mx-auto" onClick={play_pause}>
                <svg width="50" height="50" fill="none">
                <circle class="text-gray-300 text-gray-500" cx="25" cy="25" r="24" stroke="currentColor" stroke-width="1.5" />
                <path d="M18 16h4v18h-4V16zM28 16h4v18h-4z" fill="currentColor" />
                </svg>
            </button>
            <input type="range" id="volume-control" onChange={updateVolume}></input>

            <a id="spotifyURI" target="_blank" rel="noreferrer" href="https://open.spotify.com/track/"><svg xmlns="http://www.w3.org/2000/svg" height="50" width="80" viewBox="-33.4974 -55.829 290.3108 334.974"><path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0" fill="#1ed660"/></svg></a>
            </div>                
                    <video className='video hidden' id="radioStream" Width={"800px"} preload="none" ref={player => (this.player = player)} preload="none" controls />
                    
                </div>
            </div>

    );
  }
  shouldShowLoader() {
    return !!this.props.nextPageToken;
  }
}