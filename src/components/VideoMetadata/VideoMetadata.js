import React from 'react';
import './VideoMetadata.module.scss';

export function VideoMetadata(props) {
  if (!props.video) {
    return <div/>;
  }

  return (
    <div className='video-metadata'>
      <h3>{props.video.title}</h3>
    </div>
  );
}