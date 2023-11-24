import React from 'react'
import { CanAccess, IResourceComponentsProps } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import { ScrollArea, Table, Pagination, Group } from '@mantine/core'
import { List, EditButton, ShowButton, DeleteButton, DateField, UrlField } from '@refinedev/mantine'

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  // 以下と同じ
  // return <MantineListInferencer />;
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'Id',
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
      },
      {
        id: 'created_at',
        accessorKey: 'created_at',
        header: 'Created At',
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />
        },
      },
      {
        id: 'updated_at',
        accessorKey: 'updated_at',
        header: 'Updated At',
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />
        },
      },
      {
        id: 'url',
        accessorKey: 'url',
        header: 'Url',
        cell: function render({ getValue }) {
          return <UrlField value={getValue<any>()} />
        },
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: 'Actions',
        cell: function render({ getValue }) {
          return (
            <Group spacing='xs' noWrap>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          )
        },
      },
    ],
    [],
  )

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  })

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }))

  return (
    <CanAccess
      resource='categories'
      action='list'
      fallback={<h1>You are not authorized to see this page.</h1>}
    >
      <List>
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id}>
                        {!header.isPlaceholder &&
                          flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </ScrollArea>
        <br />
        <Pagination position='right' total={pageCount} page={current} onChange={setCurrent} />
      </List>
    </CanAccess>
  )
}
