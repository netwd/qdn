import React from 'react';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

export class InboxPreview extends React.Component {
  render() {
    
    const Inbox = this.props;
    if (!Inbox) {
      return <div/>;
    }
    const InboxTitle = Inbox.title;
    const InboxThumbnail = Inbox.thumbnail + '?fit=crop&h=300&w=500';  
      
    
        return (
            <div class="bg-dark-900 blur-lg text-white font-semibold rounded-lg shadow hover:bg-yellow-600 focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95">
                <a href={'/pages/InboxItem?query='+Inboxslug}>
                    <img class="bg-white rounded-lg" src={InboxThumbnail} alt={InboxTitle}/>
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{InboxTitle}</div>
                    </div>
                </a>
            </div>
                
          );
        }
      }
