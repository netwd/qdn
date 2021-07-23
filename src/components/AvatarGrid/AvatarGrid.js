import React from 'react';
import styles from './AvatarGrid.module.scss';
import {AvatarPreview} from '../AvatarPreview/AvatarPreview';
import Grid from "@material-ui/core/Grid";


export function AvatarGrid(props) {
  if (!props.Avatars || !props.Avatars.length || !props.lineup) {

    return <div/>;
  }
  var gridItems = ""
  if (props.Avatars !== "NOP") {
     gridItems = props.Avatars.map(Avatar => {
      return (<Grid item md={2}><AvatarPreview name={Avatar.name}
                            id={Avatar.id}
                            avatar={Avatar.avatar}/></Grid>
      );
    });
  
  } else if (props.lineup !== "NOP") {
    gridItems = props.lineup.map(lineup => {
      return (<Grid item md={2}><AvatarPreview name={lineup.title}
                            id={lineup.id}
                            avatar={lineup.thumbnail}/></Grid>
      );
    });

  } else if (props.timetable !== "NOP") {
    if(props.timetable.length === 0) {
      return (<Grid item md={2}><AvatarPreview
        avatar='null'/></Grid>
)
    }
    gridItems = props.timetable.map(timetable => {
      
      return (<Grid item md={2}><AvatarPreview name={timetable.title}
                                               id={timetable.id}
                                               avatar={timetable.image}/></Grid>
      );
    });
  }
  

  return (
    <div className={styles['Avatar-grid']}>
        
    {gridItems}
  </div>
    
  
  );

  }