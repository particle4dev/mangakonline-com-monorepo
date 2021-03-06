import { createTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

const darktheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[200],
    },
    secondary: {
      main: pink[200],
    },
    background: {
      default: '#121212',
    },
  }
});

export default darktheme;
