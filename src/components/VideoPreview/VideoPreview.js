import React from 'react';


export class VideoPreview extends React.Component {


  

  render() {

    const video = this.props;
    if (!video) {
      return <div/>;
    }

    const videoTitle = video.title;
    const videoThumbnail = video.thumbnail + '?fit=crop&h=300&w=500';
    const videoId = video.id.toString()
    const videoSub = video.subscription.toString()
    
    


        return (
          <div class="bg-dark-900 blur-lg text-white font-semibold rounded-lg shadow hover:bg-yellow-600 focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95">
            <a href={'/pages/Library/Vod?query='+videoId}>
            <img class="bg-white rounded-lg shadow-lg" src={videoThumbnail} alt={videoTitle}/>
            <div class="px-6 py-4">
             
              <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{videoTitle}</div>
              <div class="flex-grow">
              <hr/>
                <span class="inline-block bg-red-light rounded-full p-1 pb-0 mr-2 bottom-0 right-0 text-white hover:text-gray-200">
                {videoSub}
                </span>
                
              </div>
              </div>
            </a>
          </div>

          );
        }
      };