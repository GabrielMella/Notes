import {
    Table,
    Tfoot,
    Tr,
    Th,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


interface TableSkeletonProps {
    children: any;
}

export const TaskTable: React.FC<TableSkeletonProps> = ({ children }) => {
    return(
        <TableContainer>
            <Table variant='striped'>
                {children}
            </Table>
        </TableContainer>
    )
}