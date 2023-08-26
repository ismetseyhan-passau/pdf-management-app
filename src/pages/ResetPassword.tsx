import {TextField, Button, Container, Paper, Typography} from '@mui/material';
import {Formik, Form, Field} from 'formik';
import {forgetPassword} from "../schemas/FormValidationSchema.tsx";
import {toast, ToastContainer} from "react-toastify";
import {useAuth} from "../contexts/AuthContext.tsx";

import Link from "@mui/material/Link";


const ResetPassword = () => {
    const {resetPassword} = useAuth();


    const handleSubmit = async (values: { email: string }, {resetForm}: { resetForm: () => void }) => {
        try {
            await resetPassword(values.email);
            resetForm();
            toast.success('Password reset email sent', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (error) {
            toast.error(`Error: ${error}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{padding: 2, marginTop: 8}}>
                <Typography variant="h5" align="center" gutterBottom>
                    Forgot password?
                </Typography>
                <ToastContainer/>
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={forgetPassword}
                    onSubmit={handleSubmit}
                >
                    {({errors, touched}) => (
                        <Form>
                            <Field
                                name="email"
                                label="Email"
                                fullWidth
                                as={TextField}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{marginTop: 2}}
                            >
                                Reset Password
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
            <Link href="/login" variant="body2">
                {"Back to login"}
            </Link>
        </Container>


    );
};

export default ResetPassword;
