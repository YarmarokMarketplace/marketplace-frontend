import React, { useEffect } from 'react';
import { Button, Stack, Tabs, Typography } from '@mui/material';
import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { StyledTab } from '../SettingsTab/style';
import OwnProductItem from '../ProductItem/OwnProductItem';
import { StyledContrastButton, StyledIconButton } from '../ProductItem/style';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoProductItem from './NoProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { ownAdsStateSelector } from '../selector';
import { AppDispatch } from '../../../../store';
import { userProductsListFetch } from '../thunk';
import { ProductItem } from '../../../../types';
import ProfilePagination from '../ProfilePagination';
import SkeletonAds from '../SkeletonAds';
import { currentPageSetAction } from '../reducer';

interface TabPanelProps {
  children?: React.ReactNode;
  type: string;
  value: string;
}

const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, type, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== type}
      id={`own-ads-tab-${type}`}
      aria-labelledby={`own-ads-tab-${type}`}
      {...other}
    >
      {value === type && <>{children}</>}
    </div>
  );
};

const OwnAdsTab = () => {
  const [value, setValue] = React.useState<string>('active');
  const [active, setActive] = React.useState<ProductItem[] | []>([]);
  const [inactive, setInactive] = React.useState<ProductItem[] | []>([]);
  const {
    loading,
    error,
    data: { totalPages, notices, page, limit },
  } = useSelector(ownAdsStateSelector);

  const dispatch: AppDispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(userProductsListFetch({ page, limit }));
  }, [page, limit]);

  useEffect(() => {
    if (notices.length > 0) {
      setActive(notices.filter((product) => product.active));
      setInactive(notices.filter((product) => !product.active));
    }
  }, [notices]);
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentPageSetAction(page));
  };
  return (
    <StyledAdsContainer>
      <StyledTitleContainer>
        <Typography variant="h4">Оголошення</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            mt: 2,
            minHeight: '2rem',
            borderRadius: 3,
            '& .MuiTabs-flexContainer': {
              maxHeight: '100%',
            },
            '& .MuiTabs-indicator': {
              background: 'none',
            },
          }}
        >
          <StyledTab
            label="Активні"
            id="own-ads-tab-0"
            aria-controls="own-ads-tabpanel-0"
            value="active"
          />
          <StyledTab
            label="Неактивні"
            id="own-ads-tab-1"
            aria-controls="own-ads-tabpanel-1"
            value="inactive"
          />
        </Tabs>
      </StyledTitleContainer>
      <CustomTabPanel value={value} type="active">
        {loading && <SkeletonAds limit={limit} />}
        {!loading && !error && notices.length > 0 && active.length > 0 && (
          <Stack gap={3}>
            {active.map((product) => {
              return (
                <>
                  <OwnProductItem product={product}>
                    <Stack
                      direction="row"
                      gap={3}
                      justifyContent="space-between"
                      height="fit-content"
                    >
                      <StyledContrastButton
                        id="deactivate-btn"
                        variant="outlined"
                      >
                        Деактивувати
                      </StyledContrastButton>
                      <StyledIconButton id="edit-btn">
                        <EditOutlinedIcon
                          sx={{ fontSize: '1.5rem' }}
                          color="primary"
                        />
                      </StyledIconButton>
                    </Stack>
                  </OwnProductItem>
                </>
              );
            })}
          </Stack>
        )}
        {!loading && !error && active.length === 0 && (
          <>
            <NoProductItem>
              <Typography variant="h4" fontWeight={700} mt={3}>
                Активні оголошення відображаються тут до закінчення їх терміну
                дії
              </Typography>
              <Typography
                variant="body1"
                fontWeight={500}
                color="text.secondary"
                mt={1}
              >
                Ці оголошення доступні для перегляду всім і стають неактивними
                через 30 днів після їх активації.
              </Typography>
            </NoProductItem>
          </>
        )}
        {!error && active.length > 0 && (
          <ProfilePagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} type="inactive">
        {loading && <SkeletonAds limit={limit} />}
        {!loading && !error && notices.length > 0 && inactive.length > 0 && (
          <Stack gap={3}>
            {inactive.map((product) => {
              return (
                <>
                  <OwnProductItem product={product}>
                    <Stack gap={3} marginLeft={5.5}>
                      <Button id="activate-btn" variant="outlined" fullWidth>
                        Активувати
                      </Button>
                      <Stack
                        direction="row"
                        gap={3}
                        justifyContent="center"
                        height="fit-content"
                      >
                        <StyledContrastButton
                          id="delete-btn"
                          variant="outlined"
                        >
                          Видалити
                        </StyledContrastButton>
                        <StyledIconButton id="edit-btn">
                          <EditOutlinedIcon
                            sx={{ fontSize: '1.5rem' }}
                            color="primary"
                          />
                        </StyledIconButton>
                      </Stack>
                    </Stack>
                  </OwnProductItem>
                </>
              );
            })}
          </Stack>
        )}
        {!error && inactive.length === 0 && (
          <>
            <NoProductItem>
              <Typography variant="h4" fontWeight={700} mt={3}>
                Оголошення переміщуються сюди після закінчення терміну дії
              </Typography>
              <Typography
                variant="body1"
                fontWeight={500}
                color="text.secondary"
                mt={1}
              >
                Ви також можете деактивувати оголошення до закінчення терміну
                його дії.
              </Typography>
            </NoProductItem>
          </>
        )}
        {!loading && !error && inactive.length > 0 && (
          <ProfilePagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        )}
      </CustomTabPanel>
    </StyledAdsContainer>
  );
};

export default OwnAdsTab;
