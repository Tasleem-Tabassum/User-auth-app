/* eslint-disable linebreak-style */
import React from "react";
import { Button, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
 
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#f02726",
        },
    }
});

const useStyles = makeStyles((theme) => ({
    homeHeader: {
        fontSize: "35px",
        fontWeight: "bold",
        margin: "30px 0",
        color: "#1976d2",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    homePage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DFDFDF",
        height: "100vh",
        color: "#40424D",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        lineHeight: "1.5",
    
    },
    homeBlock: {
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.3)",
        padding: "25px",
        backgroundColor: "#ffffff",
        marginTop: "auto",
        marginBottom: "auto"
    },
    loginBlock: {
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: "20px",
        lineHeight: "3",
    },
    signUpBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "20px",
        lineHeight: "3",
    },
    homeButtons: {
        margin: theme.spacing(1),
    },
    loginContent: {

    },
    signUpContent: {

    }
}));

const Home: React.FC = () => {
    const classes = useStyles();

    const navigate = useNavigate();

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate("/login");
    };

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate("/signup");
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.homePage}>
                <span className={classes.homeHeader}>
                    USER PORTAL
                </span>
                <div className={classes.homeBlock}>
                    <div className={classes.loginBlock}>
                        <span className={classes.loginContent}>
              Welcome Back!
                            <br/>
              Please login to connect back to the service. 
                            <br/>
              Login Now!
                        </span>
                        <Button variant='contained' color='primary' className={classes.homeButtons} onClick={(e) => handleLogin(e)}>
              Login
                        </Button>
                    </div>
                    <div className={classes.signUpBlock}>
                        <span className={classes.signUpContent}>
              New User?
                            <br/>
              Please register to use our services. 
                            <br/>
              SignUp Now!
                        </span>
                        <Button variant='contained' color='primary' className={classes.homeButtons} onClick={(e) => handleSignUp(e)}>
              SignUp
                        </Button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Home;