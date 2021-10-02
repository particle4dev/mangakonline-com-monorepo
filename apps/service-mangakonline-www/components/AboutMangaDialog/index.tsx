import * as React from 'react';
import Link from 'next/link';
import { useTheme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import { TransitionProps } from '@material-ui/core/transitions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { DateFormat } from "@mp-workspace/ui-penguin-ui-react-time-ago";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:AboutMangaDialog');

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return fullScreen ? <Slide direction="left" ref={ref} timeout={0.6} {...props} /> : <Fade ref={ref} timeout={0.6} {...props} />;
});

type Genre = {
  __typename: "CatalogCategoryEntity";
  _id: string;
  label: string | null;
  slug: string | null;
};

export type AboutMangaDialogProps = {
  value: boolean;
  description?: string;
  genres?: Genre[];
  publishedOn?: string;
  onHandleClose: () => void;
};

const nameid = 'about-manga-dialog';

export default function AboutMangaDialog({ value, description, genres = [], publishedOn = '', onHandleClose }: AboutMangaDialogProps) {
  debug('render');

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={value}
      fullScreen={fullScreen}
      onClose={onHandleClose}
      aria-labelledby={`${nameid}-title`}
      aria-describedby={`${nameid}-description`}
      TransitionComponent={Transition}
    >
      <AppBar id={`${nameid}-title`} color="inherit" elevation={0} position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onHandleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            About this manga
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <DialogContentText id={`${nameid}-description`}>
          {description}
        </DialogContentText>
        <Divider />
        <List disablePadding>
          {/* <ListItem alignItems="flex-start" disableGutters>
            <ListItemText
              primary="Author"
              secondary={<span>
                Ali Connors
              </span>}
            />
          </ListItem> */}
          <ListItem alignItems="flex-start" disableGutters>
            <ListItemText
              primary="Genres"
              secondary={genres.map((e: Genre) => <span key={`category-detail-manga-${e.slug}`}>
                <Link href="/genres/[id]" as={`/genres/${e.slug}`}>
                  <a style={{
                    color: '#fff'
                  }} aria-label={`View ${e.label} category`}>{e.label}</a>
                </Link>{" • "}
              </span>)} />
          </ListItem>
          <ListItem alignItems="flex-start" disableGutters>
            <ListItemText
              primary="Published on"
              secondary={<span>
                <DateFormat value={publishedOn} format="MMM D, YYYY" />
              </span>}
            />
          </ListItem>

          <ListItem alignItems="flex-start" disableGutters>
            <ListItemText
              primary="Language"
              secondary={<span>
                English
              </span>}
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}
