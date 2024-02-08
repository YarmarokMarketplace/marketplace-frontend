import React, { useEffect } from 'react';
import {
  Button,
  Stack,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { StyledTab } from '../SettingsTab/style';
import OwnProductItem from '../ProductItem/OwnProductItem';
import { StyledContrastButton, StyledIconButton } from '../ProductItem/style';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NoProductItem from './NoProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { ownAdsStateSelector } from '../../../../redux/profile/selector';
import { AppDispatch } from '../../../../store';
import {
  userProductsListFetch,
  activateOrDeactivateProductFetch,
  deleteProductFetch,
} from 'redux/profile/thunk';
import { ModalContent } from '../../../../types';
import ProfilePagination from '../ProfilePagination';
import SkeletonAds from '../SkeletonAds';
import { currentPageSetAction } from 'redux/profile/reducer';

import {
  openModalAction,
  setModalContentAction,
} from 'src/components/CustomModal/reducer';
import { setProductIdAction } from 'redux/profile/reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';
import SearchBar from 'src/components/SearchBar';

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
      style={{ width: '100%', minHeight: '50vh' }}
    >
      {value === type && <>{children}</>}
    </div>
  );
};

const OwnAdsTab = () => {
  const [value, setValue] = React.useState<string>('active');
  const {
    loading,
    error,
    data: {
      totalPagesActive,
      totalPagesInactive,
      activeResult,
      inactiveResult,
      activeNotices,
      inactiveNotices,
      page,
      limit,
    },
  } = useSelector(ownAdsStateSelector);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const isLgScreen = useMediaQuery(theme.breakpoints.only('md'));
  const isXlScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const dispatch: AppDispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    dispatch(currentPageSetAction(1));
  };

  useEffect(() => {
    dispatch(userProductsListFetch({ page, limit }));
  }, [page, limit]);

  useEffect(() => {
    return () => {
      dispatch(currentPageSetAction(1));
    };
  }, []);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentPageSetAction(page));
  };

  const handleDeactivateClick = async (e: React.SyntheticEvent) => {
    const productId = e.currentTarget.getAttribute('data-product-id');
    const active: boolean = false;
    if (productId) {
      await dispatch(activateOrDeactivateProductFetch({ productId, active }));
      if (activeNotices.length % limit === 1) {
        dispatch(currentPageSetAction(page - 1));
      } else {
        await dispatch(userProductsListFetch({ page, limit }));
      }
    }
  };
  const handleActivateProductClick = async (e: React.SyntheticEvent) => {
    const productId = e.currentTarget.getAttribute('data-product-id');
    const active: boolean = true;
    if (productId) {
      await dispatch(activateOrDeactivateProductFetch({ productId, active }));
      if (inactiveNotices.length % limit === 1) {
        dispatch(currentPageSetAction(page - 1));
      } else {
        await dispatch(userProductsListFetch({ page, limit }));
      }
    }
  };

  const handleClickDeleteProduct = (e: React.SyntheticEvent) => {
    const productId = e.currentTarget.getAttribute('data-del-btn-id');
    if (productId) {
      dispatch(setProductIdAction(productId));
      dispatch(openModalAction(true));
      dispatch(setModalContentAction(ModalContent.deleteProduct));
    }
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
              gap: isSmScreen ? '8px' : '0px',
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
        {!loading && !error && activeNotices.length > 0 && (
          <Stack gap={3}>
            {activeNotices.map((product) => {
              console.log(product._id);
              return (
                <OwnProductItem product={product} key={product._id}>
                  <Stack justifyContent="space-between" alignItems="flex-end">
                    <Stack
                      direction="row"
                      gap={3}
                      justifyContent={{ md: 'flex-start', lg: 'space-between' }}
                      height="fit-content"
                      width="100%"
                      marginTop={{ xs: 2, sm: 2, md: 0 }}
                    >
                      <StyledContrastButton
                        data-product-id={product._id}
                        id="deactivate-btn"
                        variant="outlined"
                        onClick={handleDeactivateClick}
                      >
                        Деактивувати
                      </StyledContrastButton>
                      <StyledIconButton id="edit-btn">
                        <EditOutlinedIcon
                          sx={{ fontSize: '1.5rem' }}
                          color="primary"
                          onClick={() =>
                            navigate(`/edit-advert/${product._id}`)
                          }
                        />
                      </StyledIconButton>
                    </Stack>
                    {(isLgScreen || isXlScreen) && (
                      <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={1}>
                          <PhoneIcon fontSize="small" color="secondary" />
                          <Typography variant="body1" color="secondary.dark">
                            {product.contactsViews}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <VisibilityIcon fontSize="small" color="secondary" />
                          <Typography variant="body1" color="secondary.dark">
                            {product.views}
                          </Typography>
                        </Stack>
                        <Typography variant="body1" color="secondary.dark">
                          {
                            <Moment format="DD/MM/YY">
                              {product.createdAt}
                            </Moment>
                          }
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </OwnProductItem>
              );
            })}
          </Stack>
        )}
        {!loading && activeNotices.length === 0 && (
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
        {!error && activeNotices.length > 0 && (
          <ProfilePagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPagesActive}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} type="inactive">
        {loading && <SkeletonAds limit={limit} />}
        {!loading && !error && inactiveNotices.length > 0 && (
          <Stack gap={3}>
            {inactiveNotices.map((product) => {
              return (
                <OwnProductItem product={product} key={product._id}>
                  <Stack justifyContent="space-between" alignItems="flex-end">
                    <Stack
                      direction={{ md: 'column', lg: 'row' }}
                      gap={1.5}
                      justifyContent="space-between"
                      alignItems={{ md: 'flex-end', lg: 'space-between' }}
                      height="fit-content"
                      width="100%"
                      marginTop={{ xs: 2, sm: 2, md: 0 }}
                    >
                      <Button
                        data-product-id={product._id}
                        onClick={handleActivateProductClick}
                        id="activate-btn"
                        variant="outlined"
                        fullWidth
                      >
                        Активувати
                      </Button>
                      <Stack direction="row" gap={1.5}>
                        {isMdScreen ? (
                          <StyledContrastButton
                            data-del-btn-id={product._id}
                            id="deactivate-btn"
                            variant="outlined"
                            onClick={handleClickDeleteProduct}
                          >
                            Видалити
                          </StyledContrastButton>
                        ) : (
                          <StyledIconButton
                            data-del-btn-id={product._id}
                            id="delete-btn"
                            onClick={handleClickDeleteProduct}
                          >
                            <DeleteOutlineIcon
                              sx={{ fontSize: '1.5rem' }}
                              color="primary"
                            />
                          </StyledIconButton>
                        )}
                        <StyledIconButton
                          id="edit-btn"
                          onClick={() =>
                            navigate(`/edit-advert/${product._id}`)
                          }
                        >
                          <EditOutlinedIcon
                            sx={{ fontSize: '1.5rem' }}
                            color="primary"
                          />
                        </StyledIconButton>
                      </Stack>
                    </Stack>
                    {(isLgScreen || isXlScreen) && (
                      <Stack direction="row" spacing={2}>
                        <Stack direction="row" spacing={1}>
                          <PhoneIcon fontSize="small" color="secondary" />
                          <Typography variant="body1" color="secondary.dark">
                            {product.contactsViews}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <VisibilityIcon fontSize="small" color="secondary" />
                          <Typography variant="body1" color="secondary.dark">
                            {product.views}
                          </Typography>
                        </Stack>
                        <Typography variant="body1" color="secondary.dark">
                          {
                            <Moment format="DD/MM/YY">
                              {product.createdAt}
                            </Moment>
                          }
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </OwnProductItem>
              );
            })}
          </Stack>
        )}
        {!loading && inactiveNotices.length === 0 && (
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
        {!loading && !error && inactiveNotices.length > 0 && (
          <ProfilePagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPagesInactive}
          />
        )}
      </CustomTabPanel>
      {isSmScreen && <CustomBottomNavigation pathname={pathname} />}
    </StyledAdsContainer>
  );
};

export default OwnAdsTab;
