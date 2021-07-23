import React from "react";
import {EventGrid} from '../../src/components/EventGrid/EventGrid';
import {EventCatGrid} from '../../src/components/EventCatGrid/EventCatGrid';
import {NavBar} from '../../src/components/NavBar/NavBar';
import styles from '../../src/Home.module.scss';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Api from "../../src/helper/api";

export default function Events({ fut_hits, past_hits, cat_hits }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary:{
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
              <EventCatGrid title="Events" videos={cat_hits}/>
              <EventGrid title="Future Events" videos={fut_hits}/>
              <EventGrid title="Past Events" videos={past_hits}/>
          </div>
        </div>
        </Box>
      </Container>
      </ThemeProvider>
        

    
    </div>
    
      )
    }
  
Events.getInitialProps = async () => {
  try {
      const api = new Api();
      const cat_res = await api.get_Event_Data(null, "?type=Regular&limit=100")
      const cat_json = await cat_res.data

      const fut_res = await api.get_Event_Edition(null, "?offset=0&time=future")
      const fut_json = await fut_res.data

      var jsonArray = []

      const past_res = await api.get_Event_Edition(null, "?offset=0&time=past&limit=100")
      const past_json = await past_res.data

      jsonArray = jsonArray.concat(past_json.data)

      var curr = 100
      var num_of_results = past_json.pagination.total
      
      for (let i = 0;  i < (Math.floor((num_of_results-100)/100)+1); i++) {
          
          var new_past = await api.get_Event_Edition(null, "?limit=100&time=past&offset="+curr.toString())
          var new_past_json = await new_past.data
          jsonArray = jsonArray.concat(new_past_json.data)
          curr = curr + 100

      }

      return { fut_hits: fut_json.data, past_hits: jsonArray, cat_hits: cat_json.data }
    } catch (e) {
      alert("Something went wrong.")
    }
  }