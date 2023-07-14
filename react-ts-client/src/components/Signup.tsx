/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, TextField, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { Alert, AlertColor } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../graphql/mutation";

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
    signupButton: {
        alignSelf: "center",
        color: "#1976d2"
    },
    signupHeader: {
        fontSize: "35px",
        fontWeight: "bold",
        margin: "30px 0",
        color: "#1976d2",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    signupPage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DFDFDF",
        height: "100vh",
        color: "#40424D",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
    
    },
    signupBlock: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        marginTop: "auto",
        marginBottom: "auto",
        maxWidth: "100%"
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "18px"
    },
  
    Group1: {
        padding: "12px"
    },
    Group2: {
        padding: "12px"
    },
    Group3: {
        paddingLeft: "30px",
        paddingRight: "15px",
        paddingBottom: "15px",
    }
}));

const Signup: React.FC = () => {

    const [signUpUser, { loading, error }] = useMutation(SIGNUP_USER);

    const classes = useStyles();

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        userName: "",
        mobile: "",
        password: "",
        role: "",
        name: ""
    });

    const [showAlert, setShowAlert] = React.useState(false);

    const [serverResponse, setServerResponse] = React.useState("");

    const [serverResponseStatus, setServerResponseStatus] = React.useState("error");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await signUpUser({
                variables: { input: user }
            });

            if(response) {
                const statusCode = response.data?.signUp?.statusCode;

                if(statusCode === 201) {
                    const body = JSON.parse(response?.data?.signUp?.body?.message);

                    setServerResponseStatus("success");

                    setServerResponse(body.message);

                    setShowAlert(true);

                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }

                else {
                    const body = JSON.parse(response?.data?.signUp?.body?.message);

                    setServerResponseStatus("error");

                    setServerResponse(body.message);

                    setShowAlert(true);
                }
            }
        } catch(e) {
            console.log("ERROR while client signup!",e);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.signupPage}>
                <span className={classes.signupHeader}>
                    USER SIGNUP
                </span>
                <div className={classes.signupBlock}>
                    <form onSubmit={(e) => handleSubmit(e)} method='POST'>
                        <div className={classes.formGroup}>
                            <div className={classes.Group1}>
                                <label htmlFor='name' className={classes.label}>
                                    Name:
                                </label>
                                <TextField 
                                    variant="outlined"
                                    type='name'
                                    name='name'
                                    id='name'
                                    placeholder='Please enter name...'
                                    className={classes.textField}
                                    onChange={(e) => setUser({...user, name: e.target.value})}
                                    value={user.name}
                                    required
                                />
                                <br/>
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
                            </div>
                            <div className={classes.Group2}>
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
                                    onChange={(e) => setUser({...user, mobile: e.target.value})}
                                    value={user.mobile}
                                    required
                                />
                                <br/>
                                <label htmlFor='role' className={classes.label}>
                                    Role:
                                </label>
                                <TextField 
                                    variant="outlined"
                                    type='role'
                                    name='role'
                                    id='role'
                                    placeholder='Please enter role...'
                                    className={classes.textField}
                                    onChange={(e) => setUser({...user, role: e.target.value})}
                                    value={user.role}
                                    required
                                />
                                <br/>
                            </div>
                        </div>
                        <div className={classes.Group3}>
                            <LoadingButton loading={loading} variant='contained' color='primary' type='submit' className={classes.signupButton}>
                                SignUp
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

export default Signup;