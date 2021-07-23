import React from "react";
import {AvatarGrid} from '../../src/components/AvatarGrid/AvatarGrid';
import {NavBar} from '../../src/components/NavBar/NavBar';
import styles from '../../src/Home.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Api from "../../src/helper/api";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function Artists({ hits }) {
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
        <Container  maxWidth="md">
            <Box my={4}>
              <div className={styles['home-content']}>
                <div className={styles['responsive-Avatar-grid-container']}>
                <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">Acts</div><br/>
                <AvatarGrid title='test' Avatars={hits} lineup="NOP"/>

                </div>
              </div>
            </Box>
          </Container>
    </ThemeProvider>
    
    </div>
    
      )
    }
  
    Artists.getInitialProps = async () => {
      
      try {
        const api = new Api();
        const res = await api.get_Acts()
        const json = await res.data

        return { hits: json.data }
      } catch (e) {
        alert("Something went wrong.")
      }
  }