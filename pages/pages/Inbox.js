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

import {InboxGrid} from '../../src/components/InboxGrid/InboxGrid';

export default function Inbox() {
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
                
                        <Typography variant="h4" component="h1" color="primary" align='center' gutterBottom>
                            Inbox
                        </Typography>
                        <hr/>

                        <Typography variant="h4" component="h1" align='center' gutterBottom>     
                            <InboxGrid/>
                        </Typography>
                
                    </div>
                </div>
            </Box>
      </Container>
      </ThemeProvider>

    </div>
    
      )
    }
  
    Inbox.getInitialProps = async (router) => {

      return "True"
    }