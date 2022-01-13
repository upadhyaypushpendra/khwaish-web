import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReceivedRequests from '../lists/ReceivedRequests';
import SentRequests from '../lists/SentRequests';
import { RequestsSubSection } from '../types';
import { useStore } from '../store';
import shallow from 'zustand/shallow';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: RequestsSubSection) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Notifications() {
    const [subSection, setSubSection] = useStore((state) => [state.subSection, state.setSubSection], shallow);

    const handleChange = (event: React.SyntheticEvent, newValue: RequestsSubSection) => {
        setSubSection(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={subSection} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Received" {...a11yProps(RequestsSubSection.received)} />
                    <Tab label="Sent" {...a11yProps(RequestsSubSection.sent)} />
                </Tabs>
            </Box>
            <TabPanel value={subSection} index={RequestsSubSection.received}>
                <ReceivedRequests />
            </TabPanel>
            <TabPanel value={subSection} index={RequestsSubSection.sent}>
                <SentRequests />
            </TabPanel>
        </Box>
    );
}
