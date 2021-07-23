import React from "react";
import {useRouter} from 'next/router'

import {NavBar} from '../../../src/components/NavBar/NavBar';
import {Watch} from '../../../src/components/Watch/Watch';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../../../src/Home.module.scss';
import {VideoGrid} from '../../../src/components/VideoGrid/VideoGrid';
import green from '@material-ui/core/colors/green';

import Api from "../../../src/helper/api";

export default function Vod({ hits, VideoID, related }) {
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
      return (
        
      <div>
        <NavBar/>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container  maxWidth="xl">
        <Box my={4}>
        <div className={styles['home-content']}>
        <div className={styles['responsive-video-grid-container']}>
          
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
          {hits.title}
          </Typography>
          <hr/>

          <Typography variant="h4" component="h1" align='center' gutterBottom>     
            { process.browser && <Watch videoId={VideoID}/> }
          </Typography>
          
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
              <VideoGrid title="Related Video's" videos={related}/>
          </div>
        </div>
        </Box>
      </Container>
      </ThemeProvider>

    </div>
    
      )
    }
  
    Vod.getInitialProps = async (router) => {
      try {
        const api = new Api();
        var size = Object.getOwnPropertyNames(router.query).length;
        if(size > 0) {
          const VideoID = router.query.query.toString()
          
          const related_content = await api.get_Related_Videos(VideoID)
          const related_content_json = await related_content.data
          
          const res = await api.get_Video_Info(VideoID)
          const json = await res.data

          return { hits: json.data, related: related_content_json.data, VideoID: VideoID}
        }
      } catch (e) {
        alert("Something went wrong.")
      }   
    }