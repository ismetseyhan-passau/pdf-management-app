import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please provide a valid email address')
        .required('Email address is required'),
    password: yup
        .string()
        .min(5, 'Password should be at least 5 characters long')
        .matches(passwordRules, {
            message: 'Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 digit',
        })
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password'),
    firstName: yup
        .string()
        .min(3, 'First name must be at least 3 characters long')
        .required('First name is required'),
    lastName: yup
        .string()
        .min(3, 'Last name must be at least 3 characters long')
        .required('Last name is required'),
    acceptTerms: yup.bool().oneOf([true], '*Accept Terms & Conditions is required')
});

export const signInSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please provide a valid email address')
        .required('Email address is required'),
    password: yup
        .string()
        .min(5, 'Password should be at least 5 characters long')
        .matches(passwordRules, {
            message: 'Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 digit',
        })
        .required('Password is required'),

});


export const advancedSchema = yup.object().shape({

    isAccepted: yup.boolean().oneOf([true], 'Please agree to the terms and conditions'),
});
