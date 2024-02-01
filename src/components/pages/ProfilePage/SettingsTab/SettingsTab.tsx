import React from 'react';

import { Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SettingsContainer, StyledTab, BoxShadowContainer } from './style';
import PersonalData from './PersonalData';
import Login_Password from './Login_Password';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';
import { useLocation } from 'react-router-dom';

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
        <BoxShadowContainer sx={{ p: 3 }}>{children}</BoxShadowContainer>
      )}
    </div>
  );
}

const SettingsTab = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { pathname } = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SettingsContainer>
      <BoxShadowContainer sx={{ mb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.125rem',
            },
          }}
        >
          Налаштування
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            mt: 2,
            minHeight: '2rem',
            borderRadius: 3,
            '& .MuiTabs-flexContainer': {
              maxHeight: '100%',
              '@media (max-width: 380px)': {
                flexDirection: 'column',
                gap: theme.spacing(2),
              },
            },
            '& .MuiTabs-indicator': {
              background: 'none',
            },
          }}
        >
          <StyledTab
            label="Персональні дані"
            id="profile-tab-0"
            aria-controls="profile-tabpanel-0"
          />
          <StyledTab
            label="Логін та пароль"
            id="profile-tab-1"
            aria-controls="profile-tabpanel-1"
          />
        </Tabs>
      </BoxShadowContainer>
      <CustomTabPanel value={value} index={0}>
        <PersonalData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Login_Password />
      </CustomTabPanel>
      {isSmScreen && <CustomBottomNavigation pathname={pathname} />}
    </SettingsContainer>
  );
};

export default SettingsTab;
