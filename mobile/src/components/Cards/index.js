import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Grid, Chip } from '@mui/material';

//icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import VerifiedIcon from '@mui/icons-material/Verified';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';


import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);  

const styles = {
    '@media (max-width: 389px)': {
      Card: { 
        minHeight:'50px',
        minWidth: '100px', // Set the minWidth to 100px for devices with a max-width of 600px (adjust the value as needed)
      },
    },
  };

const icons = [
  CalendarMonthIcon,
  WorkspacePremiumIcon,
  BrandingWatermarkIcon,
  MergeTypeIcon,
  VerifiedIcon,
  ToggleOnOutlinedIcon,
  InfoOutlinedIcon,
  SendOutlinedIcon,
];

const socIcons = {
    i: <InstagramIcon />,
    f: <FacebookIcon />,
    t: <TwitterIcon />,
    g: <GoogleIcon />,
  };
export default function BasicCard({ title, color, boxicon, names, count, percentage, isLoss, extra }) {
  const IconComponent = icons[boxicon];

  return (
    <Card sx={[styles.Card, {minHeight : '80px', p:1}]}>
        <Grid container alignItems="center">
            <Grid item xs={2} md={2} sx={{ display: 'flex', alignItems: 'flex-start', pl:1, pt:1 }} >
                <IconComponent />
            </Grid>
            <Grid item xs={10} md={10} >
                <Typography variant="subtitle1" sx={{pl:0,pt:2,fontSize: '12px', fontWeight:'bold'}}>{title}:</Typography>
            </Grid>
            <Grid item xs={12} md={12} >
            {   
                Array.isArray(names) &&
                names.map((item, index ) => {
                    const key = Object.keys(item)[0];
                    const name = item[key];
                    return (
                        <Chip
                            key={index}
                            variant="combined"
                            color={color}
                            icon={socIcons[key] || <></>}
                            label={name}
                            size="small"
                            sx={{
                                ml: 1.25,
                                mt: '3px',
                                backgroundColor: 'white',  // Set the background color to white
                                border: '1px solid rgba(25, 118, 210, 0.5)',  // Add a blue thin border
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.04)',  // Change the background color to light blue on hover
                                    border: '1px solid #1976d2'
                                },
                            }}
                        />
                    );
                })
            }
            </Grid>
        </Grid>
    </Card>
  );
}
