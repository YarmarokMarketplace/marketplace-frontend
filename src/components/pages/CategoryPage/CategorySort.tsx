import React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Typography, Stack } from '@mui/material';

const CategorySort: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const StyledTab = styled(Tab)(({ theme }) => ({
        textTransform: 'none',
        minHeight: 5,
        fontSize: "1rem",
        fontWeight: 500,
        '&.Mui-selected': {
            color: 'black',
            zIndex: 1,
        },
    }));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                spacing={3}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                    Сортувати за:
                </Typography>
                <Tabs variant="standard"
                    //Styling outside the .tsx disables animation
                    sx={{
                        minHeight: '2rem',
                        height: '2.375rem',
                        borderRadius: 3,
                        padding: .7,
                        bgcolor: 'background.paper',
                        '& .MuiTabs-flexContainer': {
                            maxHeight: '100%',
                        },
                        '& .MuiTabs-indicator': {
                            height: '100%',
                            borderRadius: '12px',
                            bgcolor: '#FFF',
                        },
                    }}
                    value={value} onChange={handleChange}>
                    <StyledTab label="За новизною" />
                    <StyledTab label="Дешевше" />
                    <StyledTab label="Дорожче" />
                </Tabs>
            </Stack>
        </Box>
    );
}

export default CategorySort;