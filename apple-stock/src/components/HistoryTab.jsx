import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function HistoryTab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ width: '100%' }}>
    //   <Tabs
    //     value={value}
    //     onChange={handleChange}
    //     textColor="primary"
    //     indicatorColor="primary"
    //     aria-label="secondary tabs example"
    //   >
    //     <Tab value="1" label="1 Minute" />
    //     <Tab value="2" label="5 Minutes" />
    //     <Tab value="3" label="1 Hour" />
    //     <Tab value="4" label="1 Week" />
    //   </Tabs>
    //   <TabPanel value={value}>{<HistoryTab/>}</TabPanel>
    // </Box>
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab value="1" label="1 Minute" />
                <Tab value="2" label="5 Minutes" />
                <Tab value="3" label="1 Hour" />
                <Tab value="4" label="1 Week" />
            </TabList>
            <TabPanel value="1"></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
    </Box>
  );
}