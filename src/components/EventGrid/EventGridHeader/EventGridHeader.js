import React from 'react';
import './EventGridHeader.module.scss';
import Typography from '@material-ui/core/Typography';

export function EventGridHeader(props) {
  return (
    <div className='video-grid-header'>
      <Typography variant="h4" component="h1" color="primary" gutterBottom >
        <b>{props.title}</b>
      </Typography> 
      <hr/>
    </div>
  );
}