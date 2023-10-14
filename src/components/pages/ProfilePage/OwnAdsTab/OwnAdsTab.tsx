import React, { useEffect } from 'react';
import { Button, Stack, Tabs, Typography } from '@mui/material';
import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { StyledTab } from '../SettingsTab/style';
import OwnProductItem from '../ProductItem/OwnProductItem';
import { StyledContrastButton, StyledIconButton } from '../ProductItem/style';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoProductItem from './NoProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { ownAdsStateSelector } from '../../../../redux/profile/selector';
import { AppDispatch } from '../../../../store';
import {
  userProductsListFetch,
  activateOrDeactivateProductFetch,
  deleteProductFetch,
} from '../../../../redux/profile/thunk';
import { ModalContent } from '../../../../types';
import ProfilePagination from '../ProfilePagination';
import SkeletonAds from '../SkeletonAds';
import { currentPageSetAction } from '../../../../redux/profile/reducer';
import {
  openModalAction,
  setModalContentAction,
} from 'src/components/CustomModal/reducer';
import { setProductIdAction } from '../../../../redux/profile/reducer';

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

  const dispatch: AppDispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    dispatch(currentPageSetAction(1));
  };

  useEffect(() => {
    dispatch(userProductsListFetch({ page, limit }));
  }, [page, limit]);

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
              return (
                <OwnProductItem product={product} key={product._id}>
                  <Stack
                    direction="row"
                    gap={3}
                    justifyContent="space-between"
                    height="fit-content"
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
                      />
                    </StyledIconButton>
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
                  <Stack gap={3} marginLeft={5.5}>
                    <Button
                      data-product-id={product._id}
                      onClick={handleActivateProductClick}
                      id="activate-btn"
                      variant="outlined"
                      fullWidth
                    >
                      Активувати
                    </Button>
                    <Stack
                      direction="row"
                      gap={3}
                      justifyContent="center"
                      height="fit-content"
                    >
                      <StyledContrastButton
                        data-del-btn-id={product._id}
                        id="delete-btn"
                        variant="outlined"
                        onClick={handleClickDeleteProduct}
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
    </StyledAdsContainer>
  );
};

export default OwnAdsTab;
