/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, TextField, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Alert, AlertColor } from "@mui/material";
import { LOGIN_USER } from "../graphql/mutation";

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
    loginButton: {
        alignSelf: "center",
    },
    loginHeader: {
        fontSize: "35px",
        fontWeight: "bold",
        margin: "30px 0",
        color: "#1976d2",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    loginPage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#DFDFDF",
        color: "#40424D",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
    
    },
    loginBlock: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#868686",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.3)",
        padding: "25px",
        marginTop: "auto",
        marginBottom: "auto",
    },
    label: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(1),
        color: "#1976d2",
        fontSize: "18px",
    },

    textField: {
        marginBottom: theme.spacing(2),
    },

    formGroup: {
        padding: "15px"
    }
}));

const Login: React.FC = () => {

    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

    const classes = useStyles();

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        userName: "",
        password: ""
    });

    const [showAlert, setShowAlert] = React.useState(false);

    const [serverResponse, setServerResponse] = React.useState("");

    const [serverResponseStatus, setServerResponseStatus] = React.useState("error");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await loginUser({
                variables: { input: user }
            });

            if(response) {
                const statusCode = response.data?.login?.statusCode;


                if(statusCode === 200) {
                    const body = JSON.parse(response?.data?.login?.body?.message);

                    localStorage.setItem("token", body.token);

                    setServerResponseStatus("success");

                    setServerResponse(body.message);

                    setShowAlert(true);

                    navigate("/user");
                }

                else {
                    const body = response?.data?.login?.body?.message;

                    setServerResponseStatus("error");

                    setServerResponse(body);

                    setShowAlert(true);
                }
            } 
        }catch(e) {
            console.log("ERROR while login client!",e);
        }

    
    };

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
                            <LoadingButton loading={loading} variant='contained' color='primary' type='submit' className={classes.loginButton}>
                                Login
                            </LoadingButton>

                            {showAlert && 
                                (<Alert severity={serverResponseStatus as AlertColor}>
                                    {serverResponse}
                                </Alert>)}
                        </div>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Login;