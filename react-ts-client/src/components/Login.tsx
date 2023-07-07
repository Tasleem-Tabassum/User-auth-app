/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, TextField, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Alert, AlertColor } from '@mui/material';
import { LOGIN_USER } from '../graphql/mutation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f02726',
    },
    secondary: {
      main: '#cccccc',
    },
  }
})

const useStyles = makeStyles((theme) => ({
  loginButton: {
    alignSelf: 'center',
  },
  loginHeader: {
    fontSize: '24px',
    margin: '30px 0',
    color: '#969696',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  loginPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#868686',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    
  },
  loginBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#868686',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.3)',
    padding: '25px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },

  textField: {
    marginBottom: theme.spacing(2),
  },

  formGroup: {
    padding: '15px'
  }
}))

const Login: React.FC = () => {

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER)

  const classes = useStyles()

  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    userName: '',
    mobile: null as number | null,
    password: ''
  })

  const [showAlert, setShowAlert] = React.useState(false)

  const [serverResponse, setServerResponse] = React.useState('')

  const [serverResponseStatus, setServerResponseStatus] = React.useState('error')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)

    try{
      const response = await loginUser({
        variables: { input: user }
      })

      if(response) {
        const statusCode = response.data?.login?.statusCode


        if(statusCode === 200) {
          const body = JSON.parse(response?.data?.login?.body?.message)

          console.log(body.message)
          localStorage.setItem('token', body.token)

          setServerResponseStatus('success')

          setServerResponse(body.message)

          setShowAlert(true)

          setTimeout(() => {
            navigate('/user');
          }, 2000);
        }

        else {
          const body = response?.data?.login?.body?.message

          console.log(body)

          setServerResponseStatus('error')

          setServerResponse(body)

          setShowAlert(true)
        }
      } 
    }catch(e) {
      console.log("ERROR while login client!",e)
    }

    
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.loginPage}>
        <span className={classes.loginHeader}>
          USER LOGIN
        </span>
        <div className={classes.loginBlock}>
          <form onSubmit={(e) => handleSubmit(e)} method='POST'>
            <div className={classes.formGroup}>
              
              <label htmlFor='username' className={classes.label}>
                UserName:
              </label>
              <TextField 
                variant="outlined"
                type='text'
                name='username'
                id='username'
                placeholder='Please enter username...'
                className={classes.textField}
                onChange={(e) => setUser({...user, userName: e.target.value})}
                value={user.userName}
                required
              />
              <br/>
              <label htmlFor='mobile' className={classes.label}>
                Mobile Number:
              </label>
              <TextField 
                variant="outlined"
                type='number'
                name='mobile'
                id='mobile'
                placeholder='Please enter mobile number...'
                className={classes.textField}
                onChange={(e) => setUser({...user, mobile: parseInt(e.target.value)})}
                value={user.mobile}
                required
              />
              <br/>
              <label htmlFor='password' className={classes.label}>
                Password:
              </label>
              <TextField 
                variant="outlined"
                type='password'
                name='password'
                id='password'
                placeholder='Please enter password...'
                className={classes.textField}
                onChange={(e) => setUser({...user, password: e.target.value})}
                value={user.password}
                required
              />
              <br/>
              <Button variant='outlined' color='primary' type='submit' className={classes.loginButton}>
                Login
              </Button>

              {showAlert && 
                (<Alert severity={serverResponseStatus as AlertColor}>
                  {serverResponse}
                </Alert>)}
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login