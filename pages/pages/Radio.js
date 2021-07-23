import React from "react";
import RadioContent from '../../src/components/Radio/Radio';
import {NavBar} from '../../src/components/NavBar/NavBar';
import styles from '../../src/Home.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Api from "../../src/helper/api";

export default function Radio_({ hits }) {
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
            <div className={styles['home-content']}>
            
              { process.browser && <RadioContent url={hits.url} data={hits}/> }
              </div>
        </ThemeProvider>

    
    </div>
    
      )
    }
  
    Radio_.getInitialProps = async () => {
    try {
      const api = new Api();
      const res = await  api.get_radio()
      const json = await res.data
      return { hits: json.data }
    } catch (e) {
      alert("Something went wrong.")
    }
  }