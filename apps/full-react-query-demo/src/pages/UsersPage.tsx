import { useMemo } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { Anchor } from '@mantine/core';
import { IUser } from '../types/api-types';
import { useNavigate } from 'react-router-dom';

export const UsersPage = () => {
  const navigate = useNavigate();

  //load users
  const {
    data: users = [],
    isError: isErrorLoadingUser,
    isFetching: isFetchingUser,
    isLoading: isLoadingUser,
  } = useFetchUsers();

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'website',
        header: 'Website',
        Cell: ({ cell, renderedCellValue }) => (
          <Anchor
            onClick={(e) => e.stopPropagation()}
            href={`https://${cell.getValue<string>()}`}
            target="_blank"
          >
            {renderedCellValue}
          </Anchor>
        ),
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      data={users}
      columns={columns}
      state={{
        isLoading: isLoadingUser,
        showProgressBars: isFetchingUser,
        showAlertBanner: isErrorLoadingUser,
      }}
      mantineToolbarAlertBannerProps={
        isErrorLoadingUser
          ? {
              color: 'red',
              children: 'Error loading data',
            }
          : undefined
      }
      mantineTableBodyRowProps={({ row }) => ({
        onClick: () => navigate(`/users/${row.original.id}`),
        sx: {
          cursor: 'pointer',
        },
      })}
    />
  );
};
