import React from "react";
import {NavBar} from '../src/components/NavBar/NavBar';
import styles from '../src/Home.module.scss';
import Logout from './logout_page'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default function Events({ hits }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
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
              <Logout/>
            </div>
            </Box>
          </Container>
        </ThemeProvider>
        

      </div>
    
      )
    }
  