import Box from '@mui/material/Box';
import TableBodyBase from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

export const TableBody = styled(TableBodyBase)(() => ({
  overflow: 'hidden',
  fontSize: 14,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  verticalAlign: 'middle',
  padding: theme.spacing(2.2, 2),

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 'inherit',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  padding: theme.spacing(2, 1),
  borderColor: theme.palette.ink.i200,

  '& td, & th, & td:first-of-type': {
    border: 'none',
    borderColor: 'inherit',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
  },
  '&.no-border.bottom-row td, &.no-border.top-row td': {
    borderBottom: '1px solid transparent',
  },

  '&:nth-of-type(odd)': {},
  '&:first-of-type td, &:first-of-type th': {},
  '&:last-child td, &:last-child th': {},
  '&:hover': {
    cursor: 'pointer',
  },

  '&.top-row td, &.bottom-row td': {
    transition: 'all 270ms ease-in',
  },

  '&.bottom-row': {
    opacity: 0,
    display: 'none',
    visibility: 'hidden',
    animation: 'outAnimation 270ms ease-out',
    animationFillMode: 'forwards',
    '& td': {
      borderBottom: '1px solid transparent',
    },
  },

  '&.top-row td': {
    borderTop: '1px solid transparent',
  },

  '&.top-row td:first-of-type': {
    borderTopLeftRadius: '8px',
    borderTop: '1px solid transparent',
    borderLeft: '1px solid transparent',
  },
  '&.top-row td:last-child': {
    borderTopRightRadius: '8px',
    borderTop: '1px solid transparent',
    borderRight: '1px solid transparent',
  },
  '&.bottom-row td:first-of-type': {
    borderBottomLeftRadius: '8px',
    borderLeft: '1px solid transparent',
  },
  '&.bottom-row td:last-child': {
    borderBottomRightRadius: '8px',
    borderRight: '1px solid transparent',
  },

  '&.Mui-selected': {
    backgroundColor: '#fff',

    '&.bottom-row': {
      opacity: 1,
      visibility: 'visible',
      display: 'table-row',
      animation: 'inAnimation 250ms ease-out',
    },

    '&.top-row td': {
      borderBottom: 'none',
      borderRight: 'none',
      borderLeft: 'none',
      borderColor: 'transparent',
      borderTop: `1px solid ${theme.palette.primary.main}`,
    },
    '&.top-row td:first-of-type': {
      borderRight: 'none',
      borderBottom: 'none',
      borderColor: 'transparent',
      borderTop: `1px solid ${theme.palette.primary.main}`,
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      borderTopLeftRadius: '8px',
    },

    '&.top-row td:last-child': {
      borderRight: `1px solid ${theme.palette.primary.main}`,
      borderTopRightRadius: '8px',
    },

    '&.bottom-row td': {
      borderTop: 'none',
      borderColor: 'transparent',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    '&.bottom-row td:first-of-type': {
      borderRight: 'none',
      borderTop: 'none',
      borderColor: 'transparent',
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      borderBottomLeftRadius: '8px',
    },
    '&.bottom-row td:last-child': {
      borderRight: `1px solid ${theme.palette.primary.main}`,
      borderBottomRightRadius: '8px',
    },

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'inherit',
    },
  },
}));

export const RowTextDetail = styled(Box)(({ theme }) => ({
  fontSize: 'inherit',
  color: theme.palette.ink.i800,
  display: 'flex',
  flexDirection: 'column',
  '& span': {
    color: theme.palette.ink.i400,
    fontSize: '0.8em',
  },
  '& span.sub': {
    color: theme.palette.ink.i400,
    textTransform: 'none',
    fontSize: '0.9em',
  },
}));

export const TableRowDetail = styled(RowTextDetail)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  textTransform: 'capitalize',
}));

export const HeaderCell = styled(StyledTableCell)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 0),
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1rem',
  },
}));
