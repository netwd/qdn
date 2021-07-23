import React from "react";
import {VideoGrid} from '../../src/components/VideoGrid/VideoGrid';
import styles from '../../src/Home.module.scss';
import {NavBar} from '../../src/components/NavBar/NavBar';
import { useRouter } from 'next/router'

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Api from "../../src/helper/api";

export default function Search({ hits }) {
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
          <VideoGrid title="Search Results" videos={hits}/>
          </div>
        </div>
        </Box>
      </Container>
      </ThemeProvider>
  
  </div>
  
    )
  }

Search.getInitialProps = async (router) => {

  try {
    const api = new Api();
    
    if(Object.getOwnPropertyNames(router.query).length > 0) {
      
      var jsonArray = []
      const searchQuery = router.query.query
      const res = await api.get_Search(searchQuery)
      const json = await res.data

      jsonArray = jsonArray.concat(json.data.hits)

      var curr = 20
      
      while(json.data.hits && curr < json.data.total) {
        const res = await api.get_Search(searchQuery, '&offset='+ curr)
        const json = await res.data
        jsonArray = jsonArray.concat(json.data.hits)
        curr += 20
      }

      return { hits: jsonArray }
    
    } 
  } catch (e) {
      alert("Something went wrong.")
  }

    
}