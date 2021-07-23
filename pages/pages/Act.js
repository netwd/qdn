import React from "react";
import {useRouter} from 'next/router'

import {NavBar} from '../../src/components/NavBar/NavBar';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../../src/Home.module.scss';
import {VideoGrid} from '../../src/components/VideoGrid/VideoGrid';
import {EventGrid} from '../../src/components/EventGrid/EventGrid';
import green from '@material-ui/core/colors/green';

import Api from "../../src/helper/api";

export default function Act({ hits }) {
    const router = useRouter()
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

      
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
              main: "#f59e00"
            },
            secondary: {
              main: green[500],
            },
          },
        }),
      [prefersDarkMode],
    );
    
    const gridItems = hits.blocks.map(item => {
        var return_data
        if( item.items[0].type === "event-edition") {
            return_data = <EventGrid title={item.title} videos={item.items}/>
        } else {
            return_data = <VideoGrid title={item.title} videos={item.items}/>
        }

        return (return_data);
      });

      return (
        
      <div>
        <NavBar/>
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container  maxWidth="xl">
                <Box my={4}>
                    <div className={styles['home-content']}>
                        <div className={styles['responsive-video-grid-container']}>
                        
                        <Grid container spacing={0} direction="column" alignItems="center" justify="center">    
                            <Avatar alt={hits.name} src={hits.avatar+'?fit=crop&h=160.27826086956523&w=160.27826086956523'}/>
                        </Grid>
                        
                        <Grid container spacing={0} direction="column" alignItems="center" justify="center">       
                            <Typography variant="h4" component="h1" color="primary" gutterBottom>
                                {hits.name}
                            </Typography>
                        </Grid>
                                                        
                            <hr/>
                            

                            <Typography variant="p" component="p" gutterBottom>
                                {hits.bio}
                            </Typography>
                        
                        </div>
                    </div>
                </Box>
            </Container>
            <Container maxWidth="xl">
            <Box my={4}>
                    <div className={styles['home-content']}>
                        <div className={styles['responsive-video-grid-container']}>
                            {gridItems}
                    </div>
                    </div>
                    </Box>
            </Container>
      </ThemeProvider>

    </div>
    
      )
    }
  
    Act.getInitialProps = async (router) => {
      try {
        const api = new Api();
        var size = Object.getOwnPropertyNames(router.query).length;
        
        
        if(size > 0) {

          const ActID = router.query.q.toString()
          const res = await api.get_Act_Info(ActID)
          const json = await res.data
  
          return { hits: json.data}
        
        }
      } catch (e) {
        alert("Something went wrong.")
      }    
    }