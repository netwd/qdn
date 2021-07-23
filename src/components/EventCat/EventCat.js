import React from 'react';
import Image from 'next/image'

export class Event extends React.Component {
  
  render() {
    

    const video = this.props;
    if (!video) {
      return <div/>;
    }

    const videoTitle = video.title;
    const videoThumbnail = video.thumbnail;
    const videoId = video.id.toString()
    
    function create_image(props) {
      if (props !== null) {
        return (
          <img class="bg-white rounded-lg" src={props + '?fit=crop&h=1175.3739130434783&w=894.8869565217392'} />
        );
      } else {
        return (
          <Image src="/0.png" alt="me" width="1175" height="894" />
        );
      }
    }


        return (
          <div class="bg-dark-900 blur-lg text-white font-semibold rounded-lg shadow hover:bg-yellow-600 focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95">
          <a href={'/pages/Event_Category?q='+videoId}>
          {create_image(videoThumbnail)}
          <div class="px-6 py-4">
           
            <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{videoTitle}</div>
            <div class="flex-grow">
              
            </div>
            </div>
          </a>
        </div>

          );
        }
      };