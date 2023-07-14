/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Button, TextField, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD, GET_USER } from "../graphql/mutation";
import { Alert, AlertColor } from "@mui/material";

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
    updateButton: {
        alignSelf: "center",
        // paddingLeft: '25px'
        margin: "0px 0px 0px 0px"
    },
    cancelButton: {
        alignSelf: "center",
        // paddingLeft: '25px'
        margin: "0px 0px 0px 10px"
    },
    userHeader: {
        fontSize: "35px",
        fontWeight: "bold",
        margin: "30px 0",
        color: "#1976d2",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    userPage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#40424D",
        backgroundColor: "#DFDFDF",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
    
    },
    userBlock: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#868686",
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
        paddingLeft: "30px"
    }
}));

const ChangePassword: React.FC = () => {

    const isTokenAvailable = localStorage.getItem("token");

    const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);

    const [getUser, /*{ loading, error }*/] = useMutation(GET_USER);

    const classes = useStyles();

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        userName: "",
        oldPassword: "***********",
        newPassword: ""
    });

    const [showAlert, setShowAlert] = React.useState(false);

    const [serverResponse, setServerResponse] = React.useState("");

    const [serverResponseStatus, setServerResponseStatus] = React.useState("error");

    useEffect(() => {
        const token = localStorage.getItem("token") as string;
        fetchUserDetails(token);
    }, []);

    const fetchUserDetails = async (token: string) => {
        try {

            const response = await getUser({
                variables: { input: { token } }
            });
       
            const parsedData = JSON.parse(response.data.getUser.body.message);

            const userData = parsedData.user[0];

            setUser({ ...user, userName: userData.UserName});

        } catch(e) {
            console.log("ERROR!", e);
        }
    
    };

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const token = localStorage.getItem("token") as string;

        try {

            const response = await changePassword({
                variables: { input: { token, userName: user.userName, oldPassword: user.oldPassword, newPassword: user.newPassword } }
            });
    
            if(response) {
                const statusCode = response.data?.changePassword?.statusCode;


                if(statusCode === 200) {
                    const body = JSON.parse(response?.data?.changePassword?.body?.message);

                    setServerResponseStatus("success");

                    setServerResponse(body.message);

                    setShowAlert(true);

                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }

                else {
                    const body = JSON.parse(response?.data?.changePassword?.body?.message);

                    setServerResponseStatus("error");

                    setServerResponse(body.message);

                    setShowAlert(true);
                }
            } 
        } catch(e) {
            console.log("ERROR!", e);
        }
    
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        navigate("/user");
    };

    return (
        <ThemeProvider theme={theme}>
            {isTokenAvailable ? (<div className={classes.userPage}>
                <span className={classes.userHeader}>
                    CHANGE PASSWORD
                </span>
                <div className={classes.userBlock}>
                    <form>
                        <div className={classes.formGroup}>
                            <div className={classes.Group2}>
                                <label htmlFor='oldPassword' className={classes.label}>
                                    Old Password:
                                </label>
                                <TextField 
                                    variant="outlined"
                                    type='password'
                                    name='oldPassword'
                                    id='oldPassword'
                                    placeholder='Please enter Old Password...'
                                    className={classes.textField}
                                    onChange={(e) => setUser({...user, oldPassword: e.target.value})}
                                    value={user.oldPassword}
                                    required
                                />
                                <br/>
                                <label htmlFor='newPassword' className={classes.label}>
                                    New Password:
                                </label>
                                <TextField 
                                    variant="outlined"
                                    type='password'
                                    name='newPassword'
                                    id='newPassword'
                                    placeholder='Please enter New Password...'
                                    className={classes.textField}
                                    onChange={(e) => setUser({...user, newPassword: e.target.value})}
                                    value={user.newPassword}
                                    required
                                />
                                <br/>
                            </div>
                        </div>
                        <div className={classes.Group3}>
                            <LoadingButton loading={loading} variant='contained' color='primary' onClick={(e) => handleSave(e)} className={classes.updateButton}>
                                Save
                            </LoadingButton>
                            <Button variant='contained' color='primary' onClick={(e) => handleCancel(e)} className={classes.cancelButton}>
                                Cancel
                            </Button>

                            {showAlert && 
                                (<Alert severity={serverResponseStatus as AlertColor}>
                                    {serverResponse}
                                </Alert>)}
                        </div>
                    </form>
                </div>
            </div>) : (
                <div><Alert severity="error">Unauthorized!</Alert></div>
            )}
        </ThemeProvider>
    );
};

export default ChangePassword;
