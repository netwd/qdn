import React from "react";
import {useRouter} from 'next/router'

import {NavBar} from '../../src/components/NavBar/NavBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../../src/Home.module.scss';
import green from '@material-ui/core/colors/green';

import {MessageBox} from '../../src/components/MessageBox/MessageBox';

export default function InboxItem() {
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
   
                <MessageBox query={router.query.query.toString()}/>
          
            </div>
        </div>
        </Box>
      </Container>
      
      </ThemeProvider>

    </div>
    
      )
    }
  
    InboxItem.getInitialProps = async (router) => {

          return "True"
    }