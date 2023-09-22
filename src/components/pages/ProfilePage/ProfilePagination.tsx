import React from 'react';
import { Stack, Pagination } from '@mui/material';

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
  return (
    <Stack direction="row" justifyContent="center" m="2rem 0 4rem">
      <Pagination
        count={totalPages}
        color="primary"
        page={page}
        onChange={(event, page) => handlePageChange(event, page)}
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
