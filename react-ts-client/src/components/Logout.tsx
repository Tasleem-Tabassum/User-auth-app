import React from 'react';
import { Button, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
      primary: {
        main: '#f02726',
      }
    }
  })

const Logout: React.FC = () => {

    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        localStorage.removeItem('token')

        navigate('/');
    }

  return (
    <div>
        <Button variant='contained' color='primary' onClick={(e) => {handleClick(e)}}>Logout</Button>
    </div>
  )
}

export default Logout