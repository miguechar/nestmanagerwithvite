import { Table, TableHeader, TableColumn } from "@nextui-org/react";

export const SimpleTable = ({headerColumns, rows}) => {
    return (
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
        //   bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
        //   selectedKeys={selectedKeys}
          selectionMode="multiple"
        //   sortDescriptor={sortDescriptor}
        //   topContent={topContent}
          topContentPlacement="outside"
        //   onSelectionChange={setSelectedKeys}
        //   onSortChange={setSortDescriptor}
          >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No nests found"} >
            {(rows) => (
              <TableRow key={rows.uid}>
                {(columnKey) => (
                  <TableCell>{renderCell(rows, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
}