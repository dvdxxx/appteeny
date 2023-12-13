import React, { useEffect,useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Divider from '@mui/joy/Divider';

import axios from 'axios';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import CallMergeRoundedIcon from '@mui/icons-material/CallMergeRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CapScreen = ({ route }) => {
  const { queryParams } = route.params || {};
  const { d } = queryParams || {};
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (d) {
          const response = await axios.get(`http://192.168.178.129:8000/api/item/${d}/`);
          const data = response.data;
          setItemData(data);
        }
      } catch (error) {
        console.error('Error fetching data from Django:', error);
      }
    };

    fetchData(); // Call the async function immediately

  }, [d]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <>
      {itemData && (
      <Box
        orientation='horizontal'
        id='box-content'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 2,
          maxWidth: '100%',
          minHeight: 394,
          maxHeight: 394,
          //border: 'solid thin black',
          '@media (max-width: 768px)': {
            // Set styles for mobile view
            flexDirection: 'column', // Stack the cards in a column
            width: '100%',
            pt: 15
          },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            // Set the width for desktop view
          //width: '100%',
            '--Card-radius': (theme) => theme.vars.radius.xs,
            '@media (min-width: 769px)': {
              width: '300px', // Full width for mobile view
            },
          }}
        >
          <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 0, p:0, maxHeight:'20px'}}>
            <Typography fontWeight="lg">
              {itemData.unique_code}
            </Typography>
            <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
              <MoreHoriz />
            </IconButton>
          </CardContent>
          <Divider />
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between', maxHeight:'10px' }}>
            <Typography fontSize="sm">
              Registration date: 
            </Typography>
            <Typography fontSize="sm" sx={{ textAlign: 'right' }}>
              {itemData.registration_date}
            </Typography>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between',maxHeight:'10px' }}>
            <Typography fontSize="sm">
              Current owner: 
            </Typography>
            <Typography fontSize="sm" sx={{ textAlign: 'right' }}>
              {itemData.user}
            </Typography>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between',maxHeight:'10px' }}>
            <Typography fontSize="sm">
              Brand: 
            </Typography>
            <Typography fontSize="sm" sx={{ textAlign: 'right' }}>
              {itemData.brand}
            </Typography>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between',maxHeight:'10px' }}>
            <Typography fontSize="sm">
              Model/type: 
            </Typography>
            <Typography fontSize="sm" sx={{ textAlign: 'right' }}>
              {itemData.modeltype}
            </Typography>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between',maxHeight:'10px' }}>
            <Typography fontSize="sm">
              Status: 
            </Typography>
            <Typography fontSize="sm" sx={{ textAlign: 'right' }}>
            {itemData.status}
            </Typography>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between',maxHeight:'10px' }}>
            <Typography fontSize="sm">
              Features: 
            </Typography>
            <Typography fontSize="sm" sx={{ textAlign: 'right' }}>
            {itemData.features}
            </Typography>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between',maxHeight:'10px' }}>
            <Typography fontSize="sm">
              Additional info: 
            </Typography>
            <Typography fontSize="sm" sx={{ textAlign: 'right' }}>
              {itemData.info}
            </Typography>
          </CardContent>
          <CardContent orientation="horizontal" sx={{ justifyContent: 'space-between',maxHeight:'10px', pb:2 }}>
            
          </CardContent>
          <Divider />
          <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
            <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <FavoriteBorder />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <ModeCommentOutlined />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <SendOutlined />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
              
            </Box>
            <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </Box>
          </CardContent>
          <CardContent>
            <Link
              component="button"
              underline="none"
              fontSize="sm"
              fontWeight="lg"
              textColor="text.primary"
            >
              8.1M Likes
            </Link>

            
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            // Set the width for desktop view
            //width: '600px',
            maxWidth: '100%',
            '--Card-radius': (theme) => theme.vars.radius.xs,
            '@media (min-width: 769px)': {
              //maxWidth: '100%', // Full width for mobile view
              width: '600px',
            },
          }}
        >
          <CardOverflow sx={{p:0}}>
            <Tabs aria-label="Basic tabs" defaultValue={0} sx={{width:'100%'}}>
              <TabList>
                <Tab>Gallery</Tab>
                <Tab>Track</Tab>
              </TabList>
              <TabPanel value={0} sx={{paddingBottom:0, paddingTop:0}}>
                <AspectRatio sx={{ 
                  justifyContent: 'center',
                }}>
                    <Slider {...settings}>
                      <div>
                        <h3>1</h3>
                      </div>
                      <div>
                        <h3>2</h3>
                      </div>
                      <div>
                        <h3>3</h3>
                      </div>
                      <div>
                        <h3>4</h3>
                      </div>
                      <div>
                        <h3>5</h3>
                      </div>
                      <div>
                        <h3>6</h3>
                      </div>
                    </Slider>         
                </AspectRatio>
              </TabPanel>
              <TabPanel value={1} sx={{ 
                  maxHeight: '300px', 
                  overflow: 'auto', 
                  }}>
                <Timeline position="alternate">
                  
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <VerifiedUserRoundedIcon color="success"/>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <Typography variant="h6" component="span">
                        Marvel
                      </Typography>
                      <Typography fontSize={12}>05-11-2023</Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <AddTaskRoundedIcon color='primary'/>
                      <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <Typography variant="h6" component="span">
                        David
                      </Typography>
                      <Typography fontSize={12}>04-11-2023</Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                      <TimelineDot color="primary">
                        <FlagCircleRoundedIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <Typography variant="h6" component="span">
                        <b>Nike Inc. </b>
                      </Typography>
                      <Typography fontSize={12}>
                        04-11-2023
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </TabPanel>
            </Tabs>
          </CardOverflow>
        </Card>
      </Box>
      )}
    </>
  );
};

export default CapScreen;
