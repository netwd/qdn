  
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Grid from "@material-ui/core/Grid";

import Api from "../../../src/helper/messageAPI";

export class MessageBox extends React.Component {
  state = {
    loading: true,
    MessageInfo: null,
  }
  
  async componentDidMount() {
    const api = new Api();
    let aT = sessionStorage.getItem('accessToken')

    const Query = this.props.query;
    console.log(Query)
    if (!Query) {
      return <div/>;
    }
    var MessageInfo = await api.obtainMessageInfo(aT, Query);
    MessageInfo = await MessageInfo
    MessageInfo = await MessageInfo.data
    
    
      this.setState({MessageInfo: MessageInfo.data, loading: false})
  }
  
  render() {
    return (
        <div>
        {this.state.loading ? 
             <LinearProgress /> 
        :
      <div>
        
        <img class="bg-white rounded-lg font-bold text-xl mb-2 text-white hover:text-gray-200 center" style={{ alignSelf: 'center' }} width="450" height="450" src={this.state.MessageInfo.backgroundImage} alt={this.state.MessageInfo.title}/>
        <Typography variant="h4" component="h1" align='center' color="primary" gutterBottom>
        {this.state.MessageInfo.title}
        </Typography>
        <Typography variant="h6" component="h6" align='center' gutterBottom>
        {this.state.MessageInfo.subtitle}
        </Typography>
        <hr/>
        <br/>
        <Typography variant="p" component="p" align='center' gutterBottom>
        {this.state.MessageInfo.body}
        </Typography>
        
        
      </div>
        }
        </div>
    );
  }
}
