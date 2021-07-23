import React from 'react';
import {Event} from '../EventCat/EventCat';
import {EventCatGridHeader} from "./EventCatGridHeader/EventCatGridHeader";



export function EventCatGrid(props) {
  
  if (!props.videos || !props.videos.length) {

    return <div/>;
  }
  
  const gridItems = props.videos.map(video => {
    return (
      <div>
        <Event title={video.title} id={video.id} thumbnail={video.image}/>
      </div>
    );
  });

  return (
    <React.Fragment>
    <EventCatGridHeader title={props.title}/>
      <br/>
      <div class="grid grid-cols-6 gap-4">
        
        {/* <Grid container spacing={24}> */}
          {gridItems}
        {/* </Grid> */}
      
      </div>
      </React.Fragment>
  
  );

  }
