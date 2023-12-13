import React from 'react';
import { Text } from 'react-native';
import { Box, AppBar, Toolbar } from '@mui/material';

const CapHeader = ({ d }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Informatioin for {d}
          </Text>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CapHeader;
