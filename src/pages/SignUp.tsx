import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Card} from '@mui/material';
import {useFormik} from "formik";
import {signUpSchema} from "../schemas/FormValidationSchema.tsx";
import IUser from "../types/IUser.tsx";
import UserService from "../services/UserService.tsx";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext.tsx";
import {useEffect} from "react";
import {Helmet} from "react-helmet-async";
import {toast, ToastContainer} from "react-toastify";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ismetseyhan.com/">
                ismetseyhan.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const {signUp, currentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        currentUser?.uid != null && navigate('/dashboard', {replace: true});
    }, []);


    const onSubmit = async (values: SignUpFormValues) => {
        try {
            const result = await signUp(values.email, values.password);
            // @ts-ignore
            if (result.user) {
                const newUser: IUser = {
                    // @ts-ignore
                    uid: result.user.uid,
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName
                };
                await UserService.getInstance().addUser(newUser);
                toast.success('Signup successful!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                navigate('/login', {replace: true});
            } else {
                console.log("fail");
            }
            console.log(result);
        } catch (error) {
            console.error("An error occurred during signup:", error);
            toast.error(`Error: ${error}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };


    interface SignUpFormValues {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        confirmPassword: string;
        acceptTerms: boolean;
    }

    const initialValues: SignUpFormValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        acceptTerms: false
    };

    const formik = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit,
    });

    return (
        <>
            <Helmet>
                <title> PDF Viewer - Register </title>
            </Helmet>
            <ThemeProvider theme={defaultTheme}>
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Card
                        sx={{
                            borderColor: 'gray',
                            borderWidth: 0.2,
                            borderStyle: 'solid',
                            borderRadius: '12px',
                            padding: '20px',
                            boxShadow: '0px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)',
                        }}
                    >
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <Box
                                sx={{
                                    marginTop: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    onSubmit={formik.handleSubmit}
                                    sx={{mt: 3}}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                type="password"
                                                id="confirm-password"
                                                autoComplete="confirm-password"
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="form-group form-check">
                                                <input
                                                    type="checkbox"
                                                    name="acceptTerms"
                                                    id="acceptTerms"
                                                    className={'form-check-input ' + (formik.errors.acceptTerms && formik.touched.acceptTerms ? 'is-invalid' : '')}
                                                    checked={formik.values.acceptTerms}
                                                    onChange={formik.handleChange}
                                                />
                                                <label htmlFor="acceptTerms" className="form-check-label">Accept Terms &
                                                    Conditions</label>
                                                {/* Display error message */}
                                                {formik.errors.acceptTerms && formik.touched.acceptTerms && (
                                                    <div className="invalid-feedback"
                                                         style={{color: 'red', fontSize: 12}}>
                                                        {formik.errors.acceptTerms}
                                                    </div>
                                                )}
                                            </div>
                                        </Grid>

                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end" sx={{pb: 4}}>
                                        <Grid item>
                                            <Link href="/login" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            <Copyright/>
                        </Container>
                    </Card>
                </Box>
                <ToastContainer/>
            </ThemeProvider>

        </>
    );
}
