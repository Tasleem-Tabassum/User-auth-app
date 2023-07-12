/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Button, TextField, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD, GET_USER } from "../graphql/mutation";
import { Alert, AlertColor } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#f02726",
        },
        secondary: {
            main: "#cccccc",
        },
    }
});

const useStyles = makeStyles((theme) => ({
    updateButton: {
        alignSelf: "center",
        // paddingLeft: '25px'
        margin: "0px 30px 30px 30px"
    },
    changeButton: {
        alignSelf: "center",
        // paddingLeft: '25px'
        margin: "0px 0px 30px 0px"
    },
    userHeader: {
        fontSize: "24px",
        margin: "30px 0",
        color: "#969696",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    userPage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#868686",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
    
    },
    userBlock: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#868686",
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
    // padding: '15px'
    }
}));

const ChangePassword: React.FC = () => {

    const isTokenAvailable = localStorage.getItem("token");

    const [changePassword] = useMutation(CHANGE_PASSWORD);

    const [getUser, { loading, error }] = useMutation(GET_USER);

    const classes = useStyles();

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        userName: "",
        mobile: "",
        oldPassword: "***********",
        newPassword: "",
        name: ""
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
            console.log("entered fetch user");

            console.log("token",token);

            const response = await getUser({
                variables: { input: { token } }
            });
       
            const parsedData = JSON.parse(response.data.getUser.body.message);

            console.log(parsedData.user[0]);

            const userData = parsedData.user[0];

            // localStorage.setItem('userName', userData.UserName)
            // localStorage.setItem('mobile', userData.MobileNumber)

            setUser({ ...user, userName: userData.UserName, mobile: userData.MobileNumber, name: userData.Name});

        } catch(e) {
            console.log("ERROR!", e);
        }
    
    };

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const token = localStorage.getItem("token") as string;

        try {

            console.log("token",token);

            const response = await changePassword({
                variables: { input: { token, userName: user.userName, mobile: user.mobile, oldPassword: user.oldPassword, newPassword: user.newPassword } }
            });
    
            console.log("Response from login client",response);

            if(response) {
                const statusCode = response.data?.changePassword?.statusCode;


                if(statusCode === 200) {
                    const body = JSON.parse(response?.data?.changePassword?.body?.message);

                    console.log(body.message);

                    setServerResponseStatus("success");

                    setServerResponse(body.message);

                    setShowAlert(true);

                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }

                else {
                    const body = JSON.parse(response?.data?.changePassword?.body?.message);

                    console.log(body.message);

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
                    <form> {/* onSubmit={(e) => handleSubmit(e)} method='POST'*/}
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
                                    value={user.name}
                                    required
                                    disabled
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
                                    value={user.userName}
                                    required
                                    disabled
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
                                    value={user.mobile}
                                    required
                                    disabled
                                />
                                <br/>
                            </div>
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
                            <Button variant='outlined' color='primary' onClick={(e) => handleSave(e)} className={classes.updateButton}>
                Save
                            </Button>
                            <Button variant='outlined' color='primary' onClick={(e) => handleCancel(e)} className={classes.changeButton}>
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
