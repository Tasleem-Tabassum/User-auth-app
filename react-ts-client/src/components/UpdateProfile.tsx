/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Button, TextField, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Alert, AlertColor } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE, GET_USER } from "../graphql/mutation";

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
        margin: "0px 0px 0px 30px"
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
        paddingLeft: "30px",
        marginBottom: "10px"
        // paddingRight: "15px",
        // paddingBottom: "15px",
    },
}));

const UpdateProfile: React.FC = () => {

    const isTokenAvailable = localStorage.getItem("token");

    const [updateUser, { loading, error }] = useMutation(UPDATE_PROFILE);

    const [getUser] = useMutation(GET_USER);

    const classes = useStyles();

    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        userName: "",
        role: "",
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

            //console.log(parsedData.user[0])

            const userData = parsedData.user[0];

            // localStorage.setItem('userName', userData.UserName)
            // localStorage.setItem('mobile', userData.MobileNumber)

            setUser({ ...user, userName: userData.UserName, name: userData.Name, role: userData.Role});

        } catch(e) {
            console.log("ERROR!", e);
        }
    
    };

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const token = localStorage.getItem("token") as string;

        try {

            const response = await updateUser({
                variables: { input: { token, name: user.name, userName: user.userName, role: user.role } }
            });
    
            console.log("Response from login client",response);

            if(response) {
                const statusCode = response.data?.updateUser?.statusCode;

                if(statusCode === 200) {
                    const body = JSON.parse(response?.data?.updateUser?.body?.message);

                    console.log(body.message);

                    setServerResponseStatus("success");

                    setServerResponse("Profile Updated Successfully!");

                    setShowAlert(true);

                    setTimeout(() => {
                        navigate("/user");
                    }, 1000);
                }

                else {
                    const body = JSON.parse(response?.data?.updateUser?.body?.message);

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
                    UPDATE PROFILE
                </span>
                <div className={classes.userBlock}>
                    <form>
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
                                {/* <label htmlFor='password' className={classes.label}>
                                    Password:
                                </label>
                                <TextField 
                                    variant="outlined"
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Please enter password...'
                                    className={classes.textField}
                                    // onChange={(e) => setUser({...user, password: e.target.value})}
                                    value={user.password}
                                    required
                                    disabled
                                />
                                <br/> */}
                            </div>
                            <div className={classes.Group2}>
                                {/* <label htmlFor='mobile' className={classes.label}>
                                    Mobile Number:
                                </label>
                                <TextField 
                                    variant="outlined"
                                    type='number'
                                    name='mobile'
                                    id='mobile'
                                    placeholder='Please enter mobile number...'
                                    className={classes.textField}
                                    // onChange={(e) => setUser({...user, mobile: parseInt(e.target.value)})}
                                    value={user.mobile}
                                    required
                                    disabled
                                />
                                <br/> */}
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
                                    // onChange={(e) => setUser({...user, userName: e.target.value})}
                                    value={user.userName}
                                    required
                                    disabled
                                    InputProps={{
                                        style: { color: "black" },
                                    }}
                                />
                                <br/>
                            </div>
                        </div>
                        <div className={classes.Group3}>
                            <LoadingButton loading={loading} variant='contained' color='primary' onClick={(e) => handleUpdate(e)} className={classes.updateButton}>
                                Update
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

export default UpdateProfile;