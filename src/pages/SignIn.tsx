import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useFormik} from 'formik';
import {signInSchema} from "../schemas/FormValidationSchema.tsx";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext.tsx";
import {useEffect} from "react";
import {Helmet} from "react-helmet-async";
import {toast, ToastContainer} from "react-toastify";
import {useSearchParams} from "react-router-dom";
import UserService from "../services/UserService.tsx";

const defaultTheme = createTheme();

export default function SignInSide() {
    const {signIn, currentUser} = useAuth();
    const navigate = useNavigate();


    const [searchParams] = useSearchParams();
    const isDemoActive = searchParams.get('demo') === 'active';

    async function checkDemoAccount() {
        if (isDemoActive) {
            const credentials = await UserService.getInstance().getDemoUserCredentials();
            if (credentials) {
                if (credentials.demoOption) {
                    await formik.setFieldValue('email', credentials.username);
                    await formik.setFieldValue('password', credentials.password);
                    toast.success('Demo account successfully set', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    toast.warning('Demo account not active', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            }
        }
    }

    useEffect(() => {
        checkDemoAccount();
    }, [searchParams]);


    useEffect(() => {
        currentUser?.uid != null && navigate('/documents', {replace: true});
    }, []);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: any) => {
        try {
            await signIn(values.email, values.password).then((result) => {
                if (result) {
                    navigate('/', {replace: true});
                }

            });
        } catch (error) {
            toast.error(`Error: ${error}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }


    };

    const formik = useFormik({
        initialValues,
        validationSchema: signInSchema,
        onSubmit: handleSubmit,
    });



    return (
        <> <Helmet>
            <title> PDF Viewer - Login </title>
        </Helmet>

            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{height: '100vh'}}>
                    <CssBaseline/>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/reset-password" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </ThemeProvider>
            <ToastContainer/>
        </>

    )
        ;
}
