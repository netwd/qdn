import React from "react";
import {useRouter} from 'next/router'

import {NavBar} from '../../src/components/NavBar/NavBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../../src/Home.module.scss';
import {VideoGrid} from '../../src/components/VideoGrid/VideoGrid';
import green from '@material-ui/core/colors/green';
import {AvatarGrid} from '../../src/components/AvatarGrid/AvatarGrid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Api from "../../src/helper/api";

export default function Event({ hits, tt }) {
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
    const gridItems = hits.blocks.map(item => {
        return (<VideoGrid title={item.title} videos={item.items}/>
        );
      });

      var logo = hits.event.logo + "?h=178.8695652173913&w=100.7391304347826"
    
    
    const Timetable = <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
                <Typography>Timetable</Typography>
        </AccordionSummary>
        <AccordionDetails>
      <TableContainer component={Paper}>
            <Table className="a" aria-label="simple table">
              <TableHead>
                <TableRow>
                {tt.map((row) => (
                  <TableCell>{row.day}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              <TableRow key="test">
              
              {tt.map((row) => (
                <TableCell align="left" style={{ verticalAlign: 'top' }}>
                <hr/>
                {row.stages.map((stage) => (
                    <div>
                      <Typography variant="h6" component="h6" color="primary" gutterBottom>
                    {stage.title}
                    </Typography>
                    {stage.performances.map((performance) => (
                      <div>
                        <Paper>
                          <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                              <AvatarGrid title='test' Avatars="NOP" lineup="NOP" timetable={performance.acts}/>
                            </Grid>
                            <Grid item xs>
                              <Typography noWrap>{performance.title}<div>
                            {performance.startTime.slice(0, -3)} - {performance.endTime.slice(0, -3)} 
                      </div></Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      
                      
                      
                      <hr/>
                      
                      </div>
                      ))}
                      
                      </div>
                ))}
                </TableCell>
                  ))}

                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </AccordionDetails>
      </Accordion>
  

      return (
        
      <div>
        <NavBar/>
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container  maxWidth="xl">
                <Box my={4}>
                    <div className={styles['home-content']}>
                        <div className={styles['responsive-video-grid-container']}>
                        <Grid container direction="row" alignItems="center">
                        <Grid container spacing={0} direction="column" alignItems="center" justify="center">    
                            <img src={logo} alt=""/>
                        </Grid>
                            <Typography variant="h4" component="h1" color="primary" gutterBottom>
                            <b>{hits.event.title}</b>
                            </Typography>
                            </Grid>
                            
                            <hr/>
                            

                            <Typography variant="p" component="p" gutterBottom>
                                {hits.event.summary}
                                {hits.description}
                            </Typography>
                            
                            <Typography variant="h5" component="h5" gutterBottom>
                                <hr/>
                                Lineup:
                                <AvatarGrid title='test' Avatars="NOP" lineup={hits.acts}/>
                            </Typography>
                            <Typography variant="h5" component="h5" gutterBottom>
                                <hr/>
                                {Timetable}
                            </Typography>
                            
                        
                        </div>
                    </div>
                </Box>
            </Container>
            <Container  maxWidth="xl">
                <Box my={4}>
                    <div className={styles['home-content']}>
                        <div className={styles['responsive-video-grid-container']}>
                            {gridItems}
                        </div>
                    </div>
                </Box>
            </Container>
      </ThemeProvider>

    </div>
    
      )
    }
  
    Event.getInitialProps = async (router) => {
        try {
          const api = new Api();
          var size = Object.getOwnPropertyNames(router.query).length;
          const EventID = router.query.q.toString()

          if(size > 0) {
            
            const res = await api.get_Event_Edition(EventID)
            const json = await res.data

            const tt_res = await api.get_Event_Timetable(EventID)
            const tt_json = await tt_res.data
    
            return { hits: json.data, tt: tt_json.data}
          
          }
        } catch (e) {
          alert("Something went wrong.")
        }
    }