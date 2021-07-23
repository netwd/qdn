
import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styles from '../src/login.module.scss'
import Router from 'next/router'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Api from "../src/helper/api";
import LoginAPI from "../src/helper/loginAPI";

import Image from 'next/image'

export default class Login extends React.Component {
  
  state = {
    loggedin: false,
  }

  async componentDidMount() {
    let aT= sessionStorage.getItem('accessToken')
    if (aT) {
        this.setState({loggedin: true})
    }
    

  }

  render() { 
    const api = new Api();
    const loginapi = new LoginAPI();
    const loginUser = async event => {
      
    event.preventDefault()
    if(event.target.email.value && event.target.password.value) {
      try {
        const res = await loginapi.standard(event.target.email.value, event.target.password.value)
        const json = await res.data
        
        const aT = json.data.accessToken
        const membership_info_res = await api.get_Membership_Info(aT)
        const membership_info_json = await membership_info_res.data

          sessionStorage.setItem('accessToken', json.data.accessToken);
          sessionStorage.setItem('idToken', json.data.idToken);
          sessionStorage.setItem('refreshToken', json.data.refreshToken);
          sessionStorage.setItem('level', membership_info_json.data.level);

        Router.reload(window.location.pathname)
        return json.data
      } catch (error) {
          error = error.toString().replace( /^\D+/g, '')
          if (parseInt(error) === 404) {
            alert("Invalid email or password")
          }
      }
      }
    }
  

  const loginUser_sso = async event => {
    
    event.preventDefault()
    if (event.target.ssoToken.value) {
      if (event.target.ssoToken.value.startsWith("https://") && event.target.ssoToken.value.includes("ssoToken=")) {
        var ssoToken = event.target.ssoToken.value.split("ssoToken=")[1]
        try {
          const res = await loginapi.ssoToken(ssoToken)
          const json = await res.data
          
          const aT = json.data.accessToken
          const membership_info_res = await api.get_Membership_Info(aT)
          const membership_info_json = await membership_info_res.data

            sessionStorage.setItem('accessToken', aT);
            sessionStorage.setItem('idToken', json.data.idToken);
            sessionStorage.setItem('refreshToken', json.data.refreshToken);
            sessionStorage.setItem('level', membership_info_json.data.level);

            Router.reload(window.location.pathname)
          return json.data
        } catch (error) {
          error = error.toString().replace( /^\D+/g, '')
          if (parseInt(error) === 401) {
          alert("Invalid or expired token.")
          }
        }
      } else {
        alert('Invalid Format, please paste the full URL.')
      }
    }
  }
  
  const loginUser_RT = async event => {
    
    event.preventDefault()
    if (event.target.RT.value) {
      try {
        const res = await loginapi.refreshToken(event.target.RT.value)
        const json = await res.data
        
        const aT = json.data.accessToken
        const membership_info_res = await api.get_Membership_Info(aT)
        const membership_info_json = await membership_info_res.data
        
          sessionStorage.setItem('accessToken', json.data.accessToken);
          sessionStorage.setItem('idToken', json.data.idToken);
          sessionStorage.setItem('refreshToken', json.data.refreshToken);
          sessionStorage.setItem('level', membership_info_json.data.level);

        Router.reload(window.location.pathname)
        return json.data
      } catch (error) {
        error = error.toString().replace( /^\D+/g, '')
          if (parseInt(error) === 500) {
          alert("Invalid or expired token.")
          }
      }
    }
  }
  
  const get_login_mail = async event => {
    
    event.preventDefault()
    if(event.target.mailadress.value) {
      try {
      loginapi.obtain_login_mail(event.target.mailadress.value)
      } catch (error) {
        alert(error)
        error = error.toString().replace( /^\D+/g, '')
        if (parseInt(error) === 400) {
          alert("Emailadress invalid or could not be found.")
        }
      }
    }
  }
    
    function red_URL(props) {
      if (props.video) {

          return ('/pages/Library/Vod?query='+props.video.id);

      } else if (props.ctaButtonLink.includes("app://video_collection/")) {
        
          return ('/pages/Library/videoCollection?query='+props.ctaButtonLink.replace(/[^\d.-]/g, ''));

      } else if (props.ctaButtonLink.includes("app://video/")) {

          return ('/pages/Library/Vod?query='+props.ctaButtonLink.replace(/[^\d.-]/g, ''));

      } else if (props.ctaButtonLink.includes("app://radio")) {

          return ('/pages/Radio');

      }
      
    }

    function create_image(props) {
      if (props.foregroundImage) {
        return (
          <img class="bg-white rounded-lg" src={props.foregroundImage + '?fit=crop&h=1000&w=800'} alt="background" />
        );
      } else if (props.ctaButtonLink.includes("app://radio")) {
        return (
          <Image src="/0.png" alt="background" width="500" height="500" />
        );
      } else {
        return (
          <Image src="/0.png" alt="background" width="500" height="500" />
        );
      }
    }

  return (
        
      <div>
  {this.state.loggedin ?
              <div>
                  <Typography variant="h4" component="h1" align="center" gutterBottom color="primary">
                Network
                </Typography>
                <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
        <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
          
          {this.props.homepage.map((block) => (
            block.items.map((card) => (
              card.title !== "NEED SUPPORT?"  ?
              card.blockType !== "membership" ?
              <div class="bg-dark-900 blur-lg text-white font-semibold rounded-lg shadow hover:bg-yellow-600 focus:outline-none border-2 border-transparent hover:border-yellow-600 transform hover:scale-95">
                
                    <a href={red_URL(card)}>
                    {create_image(card)}
                      <div class="px-3 py-3">
                          <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{card.titleTop}</div>
                          <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{card.title}</div>
                          <div class="font-bold text-xl mb-2 text-white hover:text-gray-200">{card.titleBottom}</div>
                      <div class="flex-grow">
                    <hr/>
                    <span class="inline-block bg-red-light rounded-full p-1 pb-0 mr-2 bottom-0 right-0 text-white hover:text-gray-200">
                      {card.description}
                    </span>
                  </div>
              </div>
                  
                  </a>
                
              </div>
             :
             <div/>
             :
             <div/>
            ))
          ))}
          
          </div>
        </Container>
      </main>
    
               
               </div>
              :
              <div>

                 <Grid container spacing={3}>
                    <Grid item xs>
                    <form className={styles["form"]} onSubmit={loginUser}>
                  <Typography variant="h4" component="h1" align="center" gutterBottom>
                Login
                </Typography>
              <TextField
                label="Email"
                name="email"
                id="email"
                type="text"
                variant="outlined"
              />
              <br/>
              <TextField
                label="Password"
                name="password"
                id="password"
                type="password"
                variant="outlined"
              />
    
              <Button type="submit" color="primary" background-color="#f59e00" className={styles["form__custom-button"]}>
                Log in
              </Button>
         </form>
                    </Grid>
                    <Grid item xs>
                    
                    <form className={styles["form"]} onSubmit={loginUser_sso}>
                  <Typography variant="h4" component="h1" align="center" gutterBottom>
                OR
                </Typography>
                <Typography variant="p" component="subtitle1" align="center" gutterBottom>
                using ssoToken
                </Typography>
              <TextField
                label="ssoToken"
                name="ssoToken"
                id="ssoToken"
                type="text"
                variant="outlined"
              />
              <br/>
              <br/>
    
              <Button type="submit" color="primary" background-color="#f59e00" className={styles["form__custom-button"]}>
                Log in
              </Button>
         </form>
         <form className={styles["form"]} onSubmit={get_login_mail}>
                <Typography variant="p" component="subtitle1" align="center" gutterBottom>
                Obtain ssoToken
                </Typography>
              <TextField
                label="E-mail Adress"
                name="mailadress"
                id="mailadress"
                type="text"
                variant="outlined"
              />
    
              <Button type="submit" color="primary" background-color="#f59e00" className={styles["form__custom-button"]}>
                Obtain Token
              </Button>
         </form>
                    </Grid>
                    <Grid item xs>
                    <form className={styles["form"]} onSubmit={loginUser_RT}>
                  <Typography variant="h4" component="h1" align="center" gutterBottom>
                OR
                </Typography>
                <Typography variant="p" component="subtitle1" align="center" gutterBottom>
                using refreshToken
                </Typography>
              <TextField
                label="refreshToken"
                name="RT"
                id="RT"
                type="text"
                variant="outlined"
              />
              <br/>
              <br/>
    
              <Button type="submit" color="primary" background-color="#f59e00" className={styles["form__custom-button"]}>
                Log in
              </Button>
         </form>
                    </Grid>
                  </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid key={1} item>
                          
         
         
                        </Grid>
                    </Grid>
                  </Grid>
                  </Grid>
              
         </div>
         
              }  
    </div>
      )
    }
  }
