import React from 'react';
import { Stack, Pagination } from '@mui/material';
import { AppDispatch } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { currentPageSetAction } from '../../../redux/products/reducer';
import { productsResultStateSelector } from '../../../redux/products/selector';

const CategoryPagination: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { totalPages, page } = useSelector(productsResultStateSelector);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentPageSetAction(page));
  };
  return (
    <Stack direction="row" justifyContent="center" m="2rem 0 4rem">
      <Pagination
        count={totalPages}
        color="primary"
        page={page}
        onChange={handlePageChange}
        sx={{
          button: {
            fontWeight: 700,
          },
          svg: {
            fontSize: '2rem',
          },
        }}
      />
    </Stack>
  );
};

export default CategoryPagination;
