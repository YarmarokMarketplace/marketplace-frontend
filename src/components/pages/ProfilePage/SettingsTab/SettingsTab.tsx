import React, { useEffect } from 'react';

import { Tabs, Typography } from '@mui/material';
import { SettingsContainer, StyledTab, TabsContainer, ContentContainer } from "./style";
import PersonalData from './PersonalData';
import Login_Password from './Login_Password';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <ContentContainer sx={{ p: 3 }}>
                    {children}
                </ContentContainer>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`,
    };
}

const SettingsTab = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <SettingsContainer sx={{ width: '100%' }}>
            <TabsContainer sx={{ mb: 2 }}>
                <Typography variant="h4" fontSize="1.5rem" fontWeight="700">
                    Налаштування
                </Typography>
                <Tabs value={value} onChange={handleChange}
                    sx={{
                        mt: 2,
                        minHeight: "2rem",
                        borderRadius: 3,
                        "& .MuiTabs-flexContainer": {
                            maxHeight: "100%",
                        },
                        "& .MuiTabs-indicator": {
                            background: 'none'
                        },
                    }}>
                    <StyledTab label="Персональні дані" {...a11yProps(0)} />
                    <StyledTab label="Логін та пароль" {...a11yProps(1)} />
                </Tabs>
            </TabsContainer>
            <CustomTabPanel value={value} index={0}>
                <PersonalData />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Login_Password />
            </CustomTabPanel>

        </SettingsContainer>
    )
}

export default SettingsTab;
