import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // backgroundColor: theme.palette.background.paper,
    },

    root__item: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },

    root__secondaryAction: {
      fontSize: '1rem',
      textAlign: 'right',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'column',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box'
    },

    root__removeButton: {
      marginTop: 6,
      padding: '6px 0',
      // textTransform: 'inherit',
      minWidth: 0,
      // fontSize: '1rem'
    },

    root__quantityInput: {
      width: 40,
      float: 'right'
    }
  }),
);

export default function CartItems() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <List>
          <ListItem classes={{
            container: classes.root__item
          }}>
            <ListItemAvatar>
              <Avatar variant="square" alt="Cindy Baker" src="https://cf.shopee.vn/file/a29e548318ae8b7598f7fea0d4349475" style={{
                width: 80,
                height: 80,
                marginRight: 16
              }}/>
            </ListItemAvatar>
            <ListItemText
              primary="🐶🐱 ÁO CHÓ MÈO HÌNH VỊT CUTE"
            />
            <ListItemSecondaryAction className={classes.root__secondaryAction}>
              <span>
                                $49.00
              </span>
              <TextField
                value={1}
                className={classes.root__quantityInput}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Qty</InputAdornment>
                }} />
              <Button className={classes.root__removeButton}>remove</Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem classes={{
            container: classes.root__item
          }}>
            <ListItemAvatar>
              <Avatar variant="square" alt="Cindy Baker" src="https://cf.shopee.vn/file/3126b36aa29abb370f67d0e76a5a459c" style={{
                width: 80,
                height: 80,
                marginRight: 16
              }}/>
            </ListItemAvatar>
            <ListItemText
              primary="🐱🐱 CHẬU VỆ SINH CHO MÈO TẶNG KÈM XẺNG"
            />
            <ListItemSecondaryAction className={classes.root__secondaryAction}>
              <span>
                                $49.00
              </span>
              <TextField
                value={1}
                className={classes.root__quantityInput}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Qty</InputAdornment>
                }} />
              <Button className={classes.root__removeButton}>remove</Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem classes={{
            container: classes.root__item
          }}>
            <ListItemAvatar>
              <Avatar variant="square" alt="Cindy Baker" src="https://cf.shopee.vn/file/12a4bebb0465e5ab84505b3213caf87b" style={{
                width: 80,
                height: 80,
                marginRight: 16
              }}/>
            </ListItemAvatar>
            <ListItemText
              primary="Bát ăn cho chó mèo-Bát đơn inox"
            />
            <ListItemSecondaryAction className={classes.root__secondaryAction}>
              <span>
                                $49.00
              </span>
              <TextField
                value={1}
                className={classes.root__quantityInput}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Qty</InputAdornment>
                }} />
              <Button className={classes.root__removeButton}>remove</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>

      <Divider />
      <CardContent>
        <Checkbox
          defaultChecked
          value="secondary"
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <Typography
          component="div"
          variant="subtitle2"
          color="textPrimary"
        >
          Add a personalized gift message
        </Typography>
        <Typography
          component="div"
          variant="caption"
          color="textPrimary"
        >
          A card printed with your message will be included in the order. Prices will not be shown.
        </Typography>
        <Link href="/">
          <a style={{
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.66
          }}
          >Learn more</a>
        </Link>

      </CardContent>
    </Card>
  );
}
