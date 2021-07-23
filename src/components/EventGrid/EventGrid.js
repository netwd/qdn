import React from 'react';
import styles from './EventGrid.module.scss';
import {Event} from '../Event/Event';
import {EventGridHeader} from "./EventGridHeader/EventGridHeader";
import Grid from "@material-ui/core/Grid";



export function EventGrid(props) {
  
  if (!props.videos || !props.videos.length) {

    return <div/>;
  }
  
  const gridItems = props.videos.map(video => {
    return (
      <Grid item md={3}>
        <Event title={video.title} id={video.id} thumbnail={video.thumbnail}/>
      </Grid>
    );
  });

  return (
    <React.Fragment>
    <EventGridHeader title={props.title}/>
    <br/>
      <div className={styles['video-grid']}>
        <Grid container spacing={24}>
          {gridItems}
        </Grid>
      
      </div>
      </React.Fragment>
  
  );

  }
