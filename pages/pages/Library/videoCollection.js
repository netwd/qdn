import React from "react";
import {LibraryGrid} from '../../../src/components/LibraryGrid/LibraryGrid';
import {useRouter} from 'next/router'
import {NavBar} from '../../../src/components/NavBar/NavBar';
import styles from '../../../src/Home.module.scss';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Api from "../../../src/helper/api";

export default function VideoCollection({ hits }) {
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
    
    const CollectionItems = hits.map(item => {
      return (<div><Typography variant="h4" component="h2" color="primary">{item.title}</Typography><hr/>
                   <LibraryGrid Librarys={item.items}/></div>)
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
                
                {CollectionItems}

                </div>
              </div>
            </Box>
          </Container>
        </ThemeProvider>
    
    </div>
    
      )
    }
  
    VideoCollection.getInitialProps = async (router) => {
      try {
        const api = new Api();
        var size = Object.getOwnPropertyNames(router.query).length;
        if(size !== 0) {
            const res = await api.get_Video_Collection(router.query.query.toString())
            const json = await res.data
            return { hits: json.data.blocks }
        }
      } catch (e) {
        alert("Something went wrong.")
      }
    }