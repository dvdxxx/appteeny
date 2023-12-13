import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear'; 
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

import Copyright from '../../components/Footer/copyright';


const defaultTheme = createTheme();

export default function Forgot() {
    const [emailError, setEmailError] = React.useState(false);
    const [customInputProps, setCustomInputProps] =React.useState('');
    const [email, setEmail] = React.useState('');
    const emailFormatRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errorMessages = {
        emailFormat : 'Invalid e-mail address...',
        emailValid : 'E-mail is already used.',
        emailEmpty : 'E-mail can not be empty.'
    };
    const [errorMessage, setErrorMessage] = React.useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const agreeCheckbox = data.get('AgreePolicy');
        // Check if the "I agree to the privacy policy" checkbox is checked
        
        if (agreeCheckbox!='on'  || emailError || email == '') {
            // Checkbox not checked
            checkEmail();
            //console.log('emailError: '+emailError);
            return; // Prevent form submission
        }

        // If email format is valid and the checkbox is checked, you can proceed with form submission
        console.log('create user.');
    };

    const checkEmail = () => {
        if (email == '') {
            setEmailError(true);
            setErrorMessage(errorMessages.emailEmpty)
            return;
        }
        
        if (!emailFormatRegex.test(email)) {
            // Invalid email format
            setEmailError(true);
            setErrorMessage(errorMessages.emailFormat)
            return; // Prevent form submission

        } else {
            setEmailError(false);
            setErrorMessage('')
            validateEmail();
        }
    }
    const navigation = useNavigation();

    const navigateToSignIn = () => {
        navigation.navigate('Sign-in'); // Navigate to the 'Sign-up' screen
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot password
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                InputProps={{ endAdornment: customInputProps }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox name="AgreePolicy" color="primary" />}
                                label="Captcha"
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Send
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <TouchableOpacity onPress={navigateToSignIn}>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </TouchableOpacity>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}