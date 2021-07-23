import React from 'react';
import './VideoGridHeader.module.scss';
import Typography from '@material-ui/core/Typography';

export function VideoGridHeader(props) {
  return (
    <div className='video-grid-header'>
      <Typography variant="h4" component="h1" color="primary" gutterBottom >
        <b>{props.title}</b>
      </Typography> 
      <hr/>
    </div>
  );
}