import React from 'react';


export class Event extends React.Component {
  
  render() {
    

    const video = this.props;
    if (!video) {
      return <div/>;
    }

    const videoTitle = video.title;
    const videoThumbnail = video.thumbnail + '?fit=crop&h=300&w=500';
    const videoId = video.id.toString()
    


        return (
          <div class="bg-dark-900 blur-lg text-white font-semibold rounded-lg shadow hover:bg-yellow-600 focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95">
          <a href={'/pages/Event?q='+videoId}>
          <img class="bg-white rounded-lg" src={videoThumbnail} alt={videoTitle}/>
          <div class="px-3 py-8">
           
            <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{videoTitle}</div>
            </div>
          </a>
        </div>

          );
        }
      };