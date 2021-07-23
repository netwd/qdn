import React from "react";
import {LibraryGrid} from '../../src/components/LibraryGrid/LibraryGrid';
import {NavBar} from '../../src/components/NavBar/NavBar';
import styles from '../../src/Home.module.scss';

import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Api from "../../src/helper/api";

export default function Library({ hits, categories }) {
    
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
    
    const CatLibraryItems = categories.map(item => {
      return (<div>
        
        <div class="text-white font-semibold rounded-lg shadow focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95" >
        <a href={'/pages/Library/'+item.title}>
          <CardContent> 
          <Typography gutterBottom variant="h5" align="center" component="h2" color="primary" className={styles['text-cut']}> {item.title}
          </Typography> 
          </CardContent>
          </a>
          </div>
                   </div>)
    });

    const LibraryItems = hits.blocks.map(item => {
      return (<div><br/>
                  <Typography variant="h4" component="h2" color="primary">{item.title}</Typography>
                  <hr/>
                  <br/>
                  <LibraryGrid Librarys={item.items} /></div>)
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
                      <br/>
                      <Typography variant="h4" component="h2" color="primary">Categories</Typography>
                      <hr/>
                      <br/>
                      <div class="grid grid-cols-2 gap-10">
                        {CatLibraryItems}
                      </div>
                      <br/>
                        {LibraryItems}
                    </div>
                  </div>
                </Box>
              </Container>
          </ThemeProvider>
      </div>
      )
    }
  
    Library.getInitialProps = async () => {
      try {
        const api = new Api();
        const res = await api.get_Library()
        const json = await res.data

        const lib_cat = await api.get_Sections()
        const lib_cat_json = await lib_cat.data

        return { hits: json.data, categories: lib_cat_json.data }
      } catch (e) {
        alert("Something went wrong.")
      }
  }