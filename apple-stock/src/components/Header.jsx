import React, { useEffect, useState } from 'react';

const Header = () => {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [percentChange, setPercentChange] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

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
    </div>
  );
};

export default Header;
