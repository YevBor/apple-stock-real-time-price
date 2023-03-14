import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import moment from 'moment';


const Header = () => {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [percentChange, setPercentChange] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isGrowingTrend, setIsGrowingTrend] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('wss://wstest.fxempire.com?token=btctothemoon');
    console.log(socket)
    const subscribeMessage = {
      type: 'SUBSCRIBE',
      instruments: ['s-aapl'],
    };

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(JSON.stringify(subscribeMessage));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
        setPrice(data['s-aapl'].last);
        setChange(data['s-aapl'].change);
        setPercentChange(data['s-aapl'].percentChange);
        setLastUpdated(new Date(data['s-aapl'].lastUpdate).toLocaleTimeString());

      
    };
    return () => {
        const unsubscribeMessage = {
          type: 'UNSUBSCRIBE',
          instruments: ['s-aapl'],
        };
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(unsubscribeMessage));
        }
        socket.close();
      };
  }, []);

  return (
    <div className="header">
      <div className="price">{price}</div>
      <div className="change">{change}</div>
      <div className="percent-change">{percentChange}</div>
      <div className="last-updated">{`Last updated: ${lastUpdated}`}</div>
        
        <Card
        elevation={5}
        sx={{
            display: 'flex',
            minHeight: '10rem',
            justifyContent: 'center',
        }}
    >
        {/* {isLoading && <h1>Loading...</h1>}
        {!isLoading && error && <p>Error: {error}</p>}
        {!isLoading && !error && ( */}
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 2,
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h3'>Apple Inc</Typography>
                    <Typography>
                        {`As of: ${
                            lastUpdated
                        }`}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '15rem',
                    }}
                >
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        {isGrowingTrend ? (
                            <ArrowDropUpIcon sx={{ color: 'green' }} />
                        ) : (
                            <ArrowDropDownIcon sx={{ color: 'red' }} />
                        )}

                        <Typography variant='h3'>{price}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            color={isGrowingTrend ? 'green' : 'red'}
                            variant='h5'
                        >
                            {change}
                        </Typography>
                        <Typography
                            color={isGrowingTrend ? 'green' : 'red'}
                            variant='h5'
                        >
                            ({percentChange}%)
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        {/* )} */}
        </Card>
    </div>
  );
};

export default Header;
