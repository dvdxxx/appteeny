import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QrCode2Icon from '@mui/icons-material/QrCode2';

export default function BottomNavigationIcon() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label=""
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label=""
        value="auth"
        icon={<QrCode2Icon />}
      />
      <BottomNavigationAction 
        label="" 
        value="account" 
        icon={<AccountBoxIcon />} />
    </BottomNavigation>
  );
}