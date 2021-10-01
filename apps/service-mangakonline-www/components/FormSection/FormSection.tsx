import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SectionClients from '../SectionClients';
import Divider from '../Divider';

const debug = require('debug')('containers:FormSection');

const useStyles = makeStyles(theme => ({
  root__section: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    // backgroundColor: '#f5f5f5'
  },

  root__header: {
    position: "relative",
    // margin: '25px 0 20px'
  },

  root__answer: {
    marginBottom: theme.spacing(3),
  }
}));

function FormSection() {
  debug(`render`);

  const classes = useStyles();

  return (
    <SectionClients className={classes.root__section}>
      <Typography variant="h5" color='primary' gutterBottom>
                Frequently Asked Questions
      </Typography>
      <Divider />

      <TextField
        required
        id="filled-required1"
        label="Họ Tên"
        variant="filled"
      />
      <br />
      <TextField
        required
        id="filled-required2"
        label="Số Điện Thoại"
        variant="filled"
      />
      <br />
      <TextField
        required
        id="filled-required3"
        label="Địa chỉ"
        variant="filled"
      />
      <br />
      <TextField
        required
        id="filled-required4"
        label="Mã Giảm Giá"
        variant="filled"
      />
      <br />
      <TextField
        required
        id="filled-required5"
        label="Để Lại Lời Nhắn Cho Chúng Tôi"
        variant="filled"
      />
      <br />
    </SectionClients>
  );
}

if (process.env.NODE_ENV !== 'production') {
  FormSection.displayName = 'containers__FormSection';
}

FormSection.defaultProps = {};

export default FormSection;
