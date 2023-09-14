import React from 'react';
import { Stack, Pagination } from '@mui/material';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
// import { currentPageSetAction } from './reducer';

type PaginationProps = {
  page: number;
  totalPages: number;
  handlePageChange: (
    e: React.ChangeEvent<unknown>,
    currentPage: number
  ) => void;
};

const ProfilePagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  handlePageChange,
}) => {
  const dispatch: AppDispatch = useDispatch();

  //   const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
  //     dispatch(currentPageSetAction(page));
  //   };
  return (
    <Stack direction="row" justifyContent="center" m="2rem 0 4rem">
      <Pagination
        count={totalPages}
        color="primary"
        page={page}
        onChange={handlePageChange}
        sx={{
          padding: 4,
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

export default ProfilePagination;
