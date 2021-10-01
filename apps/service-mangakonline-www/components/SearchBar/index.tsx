import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:SearchBar');

const useStyles = makeStyles((theme: Theme) => ({
  root__inputRoot: {
    color: 'inherit',
    width: '100%',
    height: 48,
    margin: '12px 0'
  },

  root__inputInput: {
    padding: `${theme.spacing(1)}px 0px`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
    '&:before': {
      borderBottom: 'none !important',
      bottom: -8
    },
    '&:after': {
      bottom: -8
    }
  },

  root__inputHTMLInput: {
    textAlign: 'left'
  },
}));

type ISearchBarProps = {
  defaultValue?: string,
  onChange: (value: string) => void
}

function SearchBar(props: ISearchBarProps) {
  debug(`render`);

  const {defaultValue, onChange} = props;

  const [value, setValue] = React.useState(defaultValue || '');

  const classes = useStyles({});

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChange(value);
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      value={value}
      onKeyDown={handleKeyDown}
      onChange={onChangeInput}
      fullWidth
      placeholder={`Search ${process.env.NEXT_PUBLIC_SITE_NAME} for mangas or chapters`}
      margin="normal"
      InputProps={{
        className: classes.root__inputInput
      }}
      inputProps={{
        className: classes.root__inputHTMLInput
      }}
      classes={{
        root: classes.root__inputRoot
      }}
    />
  );
}

if (process.env.NODE_ENV !== 'production') {
  SearchBar.displayName = 'components__SearchBar';
}

SearchBar.defaultProps = {};

export default SearchBar;
