/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Button, TextField, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/mutation";
import Logout from "./Logout";

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
    // alignSelf: 'center',
    // // paddingLeft: '25px'
    // margin: '0px 30px 30px 30px'
    },
    changeButton: {
    // alignSelf: 'center',
    // // paddingLeft: '25px'
    // margin: '0px 0px 30px 0px'
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
        color: "#868686",
        backgroundColor: "#DFDFDF",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
    
    },
    userBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#404040",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
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
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "18px",
        "& table": {
            width: "100%",
            borderCollapse: "collapse",
        },
        "& td, th": {
            padding: theme.spacing(1),
            textAlign: "left",
        },
        "& th": {
            paddingRight: theme.spacing(2),
        },
        "& p": {
            margin: 0,
        },
        "& tr:not(:last-child)": {
            marginBottom: theme.spacing(1),
        },
    },
  
    Group1: {
        padding: "12px"
    },
    Group2: {
        padding: "12px"
    },
    Group3: {
        alignItems: "center",
        // display: 'flex',
        // flexDirection: 'row'
        // paddingLeft: '25px'
        // margin: '0px 0px 30px 0px'
        padding: "0px 10px 20px 20px"
    }
}));

const User: React.FC = () => {

    const isTokenAvailable = localStorage.getItem("token");

    const [getUser, { loading, error }] = useMutation(GET_USER);

    const classes = useStyles();

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        userName: "",
        // eslint-disable-next-line no-octal
        mobile: "",
        password: "*******",
        role: "",
        name: ""
    });

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

            setUser({ userName: userData.UserName, mobile: userData.MobileNumber, name: userData.Name, role: userData.Role, password: userData.Password});

        } catch(e) {
            console.log("ERROR!", e);
        }
    
    };

    const handleUpdateProfile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        navigate("/profile");
    };

    const handleChangePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        navigate("/password");
    };

    return (
        <ThemeProvider theme={theme}>
            {isTokenAvailable ? (<div className={classes.userPage}>
                <span className={classes.userHeader}>
                    USER PROFILE
                </span>
                <div className={classes.userBlock}>
                    {/* <form>
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
                                    value={user.password}
                                    required
                                    disabled
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
                                    value={user.role}
                                    required
                                    disabled
                                />
                                <br/>
                            </div>
                        </div>
                    </form> */}
                    <div className={classes.formGroup}>
                        <table>
                            <tr>
                                <td><p>Name: </p></td>
                                <th><p>{user.name}</p></th>
                            </tr>
                            <tr>
                                <td><p>Username: </p></td>
                                <th><p>{user.userName}</p></th>
                            </tr>
                            <tr>
                                <td><p>Mobile: </p></td>
                                <th><p>{user.mobile}</p></th>
                            </tr>
                            <tr>
                                <td><p>Role: </p></td>
                                <th><p>{user.role}</p></th>
                            </tr>
                        </table>
                    </div>
                    <div className={classes.Group3}>
                        <Stack spacing={2} direction="row">
                            <Button variant='contained' color='primary' onClick={(e) => handleUpdateProfile(e)} className={classes.updateButton}>
                                Update Profile
                            </Button>
                            <Button variant='contained' color='primary' onClick={(e) => handleChangePassword(e)} className={classes.changeButton}>
                                Change Password
                            </Button>
                            <Logout/>
                        </Stack>
                    </div>
                </div>
            </div>
            ) : (
                <div><Alert severity="error">Unauthorized!</Alert></div>
            )}
        </ThemeProvider>
    );
};

export default User;
