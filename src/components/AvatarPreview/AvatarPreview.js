import React from 'react';
import styles from './AvatarPreview.module.scss';

import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

export class AvatarPreview extends React.Component {
  render() {
    
    const Av = this.props;
    if (!Av) {
      return <div/>;
    }
    
    const AvatarName = Av.name;
    const AvatarId = Av.id;
    var AvatarAvatar = null;
    if(Av.avatar !== null) {
      AvatarAvatar = Av.avatar + '?h=160.27826086956523&w=160.27826086956523';
    } else {
      AvatarAvatar = Av.avatar + '?h=160.27826086956523&w=160.27826086956523';
    }
    

        return (
          <div>
          <CardActionArea href={'/pages/Act?q='+AvatarId}>
          <Typography gutterBottom variant="h5" component="h2" align="center" className={styles['text-cut']}>
          <center><img class="inline object-cover w-16 h-16 mr-2 rounded-full" alt={AvatarName} src={AvatarAvatar}/></center>
               {AvatarName}
               </Typography>
               </CardActionArea>
          </div>
        
          );
        }
      };