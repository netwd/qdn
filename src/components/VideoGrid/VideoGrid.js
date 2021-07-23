import React from 'react';
import {VideoPreview} from '../VideoPreview/VideoPreview';
import {VideoGridHeader} from "./VideoGridHeader/VideoGridHeader";



export function VideoGrid(props) {
  
  if (!props.videos || !props.videos.length) {

    return <div/>;
  }
  
  const gridItems = props.videos.map(video => {
  

    return (
        <VideoPreview title={video.title} id={video.id} thumbnail={video.thumbnail} duration={video.durationInSecond} query={video.query} subscription={video.subscription ? video.subscription.title : ""}/>

    );
  });

  return (
    <React.Fragment>
    <VideoGridHeader title={props.title}/>
      <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
          {gridItems}
        </div>
      </React.Fragment>
  
  );

  }
