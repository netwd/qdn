import React from "react";
import {useRouter} from 'next/router'

import {NavBar} from '../../src/components/NavBar/NavBar';
import Box from '@material-ui/core/Box';
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

export default function EventCat({ hits, past_events }) {
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
        return (<VideoGrid title={item.title} videos={item.items}/>
        );
      });
      var logo = hits.logo + "?h=178.8695652173913&w=100.7391304347826"
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
                            <img src={logo} alt=""/>
                        </Grid>
                            
                            <hr/>
                            

                            <Typography variant="p" component="p" gutterBottom>
                                {hits.description}
                            </Typography>
                        
                        </div>
                    </div>
                </Box>
            </Container>
            <Container  maxWidth="xl">
                <Box my={4}>
                    <div className={styles['home-content']}>
                        <div className={styles['responsive-video-grid-container']}>
                            {gridItems}
                            <EventGrid title="Past Events" videos={past_events}/>
                        </div>
                    </div>
                </Box>
            </Container>
      </ThemeProvider>

    </div>
    
      )
    }
  
    EventCat.getInitialProps = async (router) => {
        
        try {
          const api = new Api();
          var size = Object.getOwnPropertyNames(router.query).length;
          
          if(size > 0) {
            const EventID = router.query.q.toString()
            const res = await api.get_Event_Data(EventID)
            const json = await res.data

            const past_events = await api.get_Past_Event_Edition(EventID)
            const past_events_json = await past_events.data
            
            return { hits: json.data, past_events: past_events_json.data}
          
          }
        } catch (e) {
          alert("Something went wrong.")
        }
    
        
    }