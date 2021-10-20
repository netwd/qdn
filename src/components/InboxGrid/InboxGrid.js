  
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Grid from "@material-ui/core/Grid";

import Api from "../../../src/helper/messageAPI";

export class InboxGrid extends React.Component {
  state = {
    loading: true,
    inboxMessages: null,
    gridItemss: null,
  }
  
  async componentDidMount() {
    const api = new Api();
    let aT = sessionStorage.getItem('accessToken')

    var inboxMessages = await api.obtainMessages(aT);
    inboxMessages = await inboxMessages
    inboxMessages = await inboxMessages.data
    
    
    const gridItems = inboxMessages.data.map(Entry => {
        return (
          
          <div>
              <a href={'/pages/InboxItem?query='+Entry.slug}>
          <div class="bg-dark-900 blur-lg text-white font-semibold rounded-lg shadow hover:bg-yellow-600 focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95">
                
                
                    <img class="bg-white rounded-lg font-bold text-xl mb-2 text-white hover:text-gray-200" width="200" height="200" src={Entry.thumbnail} alt={Entry.title}/>
                        {Entry.title}
                    <hr/>
                    <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">
                        {Entry.createdAt}
                    </div>
                
            </div>
            </a>
          </div>
        
        );
      });
      this.setState({inboxMessages: inboxMessages.data, loading: false, gridItemss: gridItems})
  }
  
  render() {
    return (
        <div>
        {this.state.loading ? 
             <LinearProgress /> 
        :
      <div>
        {this.state.gridItemss}
        
      </div>
        }
        </div>
    );
  }
}
