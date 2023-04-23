import { useMemo } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table';
import { User } from '../types/api-types';
import { Anchor } from '@mantine/core';

export const UsersPage = () => {
  const { data: users = [], isLoading, isFetching } = useFetchUsers();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
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
          <Anchor href={`https://${cell.getValue<string>()}`} target="_blank">
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
      state={{ isLoading, showProgressBars: isFetching }}
    />
  );
};
