import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography } from '@mui/joy';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { List, ListItem } from '@mui/material';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');

  const [errorMessages, setErrorMessages] = useState([]);

  //The 4 statements must be true to be able to submit
  const [isEmailInUse, setIsEmailInUse] = useState(false);            //status wether email is in DB / false is available  
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);    //status wether privacy checkbox is checked / false is not checked
  const [isIdentical, setIsIdentical] = useState('false');                 //status wether second email is the same as the first / false is not the same
  const [emailFormat, setEmailFormat] = useState('false');              //status wether email is a correct formatted email / false is not correct format

  
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);     //true is disabled

  const checkConditions = () => {
    console.log('---------------------------------------');
    console.log('emailFormat: '+emailFormat);
    console.log('isIdentical: '+isIdentical);
    console.log('isPrivacyChecked: '+isPrivacyChecked);
    console.log('isEmailInUse: '+isEmailInUse);
    if (isEmailInUse && isPrivacyChecked && isIdentical && emailFormat) {
      setIsSubmitDisabled(false);
    }
  }
  const checkEmailInUse = async () => {
    // Make an API request to check if the email is already in use
    if (emailFormat == true) {
      try {
        // Replace the URL with the actual endpoint
        const url = `http://127.0.0.1:8000/api/echeck/?email=${email}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('data: ' + data.available)
        if (data.available) {
          // Email is available
          setIsEmailInUse('false');
          setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, inUse: '' }));
          checkConditions();
        } else {
          // Email is already in use
          setIsEmailInUse('true');
          setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, inUse: 'E-mail is already in use.' }));
        }
      } catch (error) {
        setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, inUse: 'Error checking email.' }));
        console.error('Error checking email availability:', error);
      }
    }
  };
  

  const emailCopyCheck = (email, email2) => {
    console.log('email: '+email);
    console.log('email2: '+email2);
    console.log(email === email2);
    if (emailFormat == true) {
      if (email === email2) {
        // both emails are not the same
        setIsIdentical('true');  
        setErrorMessages({ ...errorMessages, isTheSame: '' });
        checkConditions();
      } else {
        setIsIdentical('true');
        setErrorMessages({ ...errorMessages, isTheSame: 'E-mail is not the same' });
      }
    }
  }

  const validateEmail = (inputEmail) => {
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //console.log('format: '+ (!emailPattern.test(inputEmail)) );
    //const status = !emailPattern.test(inputEmail);
    //console.log('status: '+inputEmail);
    if (!emailPattern.test(inputEmail)) {
      console.log('here first');
      setEmailFormat('false'); // email is not correct
      setErrorMessages({ ...errorMessages, validFormat: 'E-mail does not have the correct format.' });
    } else {
      setEmailFormat('true');
      setErrorMessages({ ...errorMessages, validFormat: '' });  
      checkConditions();
    }

  };

  const handleSubmit = () => {
    // Additional logic can be added here for form submission
    const a = isPrivacyChecked;
    if (a) {
      // Additional logic can be added here for form submission
      validateEmail(email);
      // Continue with your form submission logic if needed
    } else {
      alert('Please agree to the privacy policy.');
    }
    // Continue with your form submission logic if needed
  };

  // Create custom InputProps to include the check icon
  const customInputProps = {
    endAdornment: isEmailInUse ? (
      <CheckIcon />
    ) : (isEmailInUse && emailFormat) ? ( // Only show the "Clear" icon when there's an email input
      <ClearIcon />
    ) : null,
  };
  
  const handlePrivacyCheck = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
    checkConditions();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        
      <TextField
          label="E-mail"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            checkEmailInUse();
            validateEmail(email);
          }}
          InputProps={customInputProps}
          sx={{paddingBottom:'10px'}}
          error={!emailFormat}
        />
        <TextField
          label="Re-enter E-mail"
          variant="outlined"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          onBlur={()=>emailCopyCheck(email,email2)}
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPrivacyChecked}
                onChange={handlePrivacyCheck}
              />
            }
            label="I agree to the privacy policy"
          />
        </FormGroup>
      </View>
      <View style={styles.errorMessages}>
        <List marker='circle'>
          {Object.values(errorMessages).map((message, index) => (
            <ListItem key={index}>
              {message}
            </ListItem>
          ))}
        </List>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          variant="outlined" 
          onClick={handleSubmit}
          disabled={isSubmitDisabled}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  errorMessages: {
    fontSize:'14px',
    color: 'red'

  },
});

export default RegisterScreen;
