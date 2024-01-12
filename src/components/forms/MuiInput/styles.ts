const inputStyles = {
  fontFamily: 'DM Sans',
  fontSize: 16,
  '& .MuiFormLabel-root': {
    fontFamily: 'inherit',
    fontSize: 'inherit',
  },
  '&.label-top': {
    marginTop: 28,
  },
  '& .MuiInputBase-input, & .MuiSelect-select': {
    fontFamily: 'TWK Everett',
    fontSize: '16px !important',
    lineHeight: 'normal',
    padding: '17px 16px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },
  '& .MuiSelect-select': { paddingRight: '32px !important' },
};

export default inputStyles;
