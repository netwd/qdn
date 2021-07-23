import React from "react";
import {NavBar} from '../src/components/NavBar/NavBar';
import styles from '../src/Home.module.scss';
import Login from './home'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Api from "../src/helper/api";

export default function Index({ hits }) {
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
        
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <NavBar/>
            <Container  maxWidth="xl">
              <Box my={4}>
                <div className={styles['home-content']}>
                  <Login homepage={hits}/>
                </div>
              </Box>
            </Container>
          </ThemeProvider>
        

      </div>
    
      )
    }

  Index.getInitialProps = async () => {
  try {
    const api = new Api();
    const res = await api.get_homepage()
    const json = await res.data
    
    return { hits: json.data.blocks}
  
  } catch (e) {
    alert("Something went wrong.")
  }

  }
