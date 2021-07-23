import React from 'react';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

export class LibraryPreview extends React.Component {
  render() {
    
    const Library = this.props;
    if (!Library) {
      return <div/>;
    }
    const LibraryTitle = Library.title;
    const LibraryThumbnail = Library.thumbnail + '?fit=crop&h=300&w=500';
    const LibraryId = Library.id.toString()
    
    var videoSub = ""
    var CAA = ""

    if (Library.type.toString() === 'video') {
      switch(Library.subscription.membershipLevel) {
        case 20:
          videoSub = "Dediqated Membership"
          break;
        case 10:
          videoSub = "Free"
          break;
        default:
          videoSub = ""
          break;
      }
      CAA =     <a href={'/pages/Library/Vod?query='+LibraryId}>
                <img class="bg-white rounded-lg" src={LibraryThumbnail} alt={LibraryTitle}/>
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{LibraryTitle}</div>
                    <div class="flex-grow">
                    <hr/>
                    <span class="inline-block bg-red-light rounded-full p-1 pb-0 mr-2 bottom-0 right-0 text-white hover:text-gray-200">
                      {videoSub}
                    </span>
                  </div>
              </div>
                </a>;
    } else {
      CAA = <a href={'/pages/Library/videoCollection?query='+LibraryId}>
        <img class="bg-white rounded-lg" src={LibraryThumbnail} alt={LibraryTitle}/>
                <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 text-white hover:text-gray-200"><VideoLibraryIcon/> {LibraryTitle}</div>
              </div>
                </a>;
    }
    
        return (
                <div class="bg-dark-900 blur-lg text-white font-semibold rounded-lg shadow hover:bg-yellow-600 focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95">
                      {CAA}
                  </div>
                
          );
        }
      };