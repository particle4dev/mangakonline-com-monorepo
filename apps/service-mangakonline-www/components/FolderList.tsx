import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

type Manga = {
  image: string,
  title: string,
  chapter: number
}

const MANGAS: Manga[] = [{
  image: "https://thumb.mghubcdn.com/rm/martial-peak.jpg",
  title: "Martial Peak",
  chapter: 785
}, {
  image: "https://thumb.mghubcdn.com/mro/i-m-the-great-immortal.jpg",
  title: "I'm The Great Immortal",
  chapter: 239
}, {
  image: "https://thumb.mghubcdn.com/mh/yuan-zun.jpg",
  title: "Yuan Zun",
  chapter: 268
}, {
  image: "https://thumb.mghubcdn.com/mn/demon-spirit-seed-manual.jpg",
  title: "Demon Spirit Seed Manual",
  chapter: 261
}, {
  image: "https://thumb.mghubcdn.com/mn/star-martial-god-technique.jpg",
  title: "Star Martial God Technique",
  chapter: 398
}, {
  image: "https://thumb.mghubcdn.com/mn/shen-yi-di-nu.jpg",
  title: "Shen Yi Di Nu",
  chapter: 344
}, {
  image: "https://thumb.mghubcdn.com/mn/hardcore-leveling-warrior.jpg",
  title: "Hardcore Leveling Warrior",
  chapter: 251
}, {
  image: "https://thumb.mghubcdn.com/mn/the-god-of-high-school.jpg",
  title: "The God of High School",
  chapter: 490
}, {
  image: "https://thumb.mghubcdn.com/mt/versatile-mage.jpg",
  title: "Versatile Mage",
  chapter: 490
}, {
  image: "https://thumb.mghubcdn.com/mn/monster-kingdom.jpg",
  title: "Monster Kingdom",
  chapter: 30
}, {
  image: "https://thumb.mghubcdn.com/md/my-sweet-home.jpg",
  title: "My Sweet Home",
  chapter: 3
}, {
  image: "https://thumb.mghubcdn.com/mn/blue-glass.jpg",
  title: "Blue Glass",
  chapter: 43
}, {
  image: "https://thumb.mghubcdn.com/mf/immortal-swordsman-in-the-reverse-world.jpg",
  title: "Immortal Swordsman in The Reverse World",
  chapter: 147
}];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function FolderList() {
  const classes = useStyles();

  return (
    <>
      <List className={classes.root}>
        <ListItem>
          {/* <div>1</div> */}
          <ListItemAvatar>
            <img src="//thumb.mghubcdn.com/mro/the-queen-is-busy.png" data-src="//thumb.mghubcdn.com/mro/the-queen-is-busy.png" alt="Harem Pics" width="40" />
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
      <ul style={{
        margin: 0,
        padding: 0,
        position: 'relative',
        listStyle: 'decimal'
      }}>
        <li>
          <div style={{
            width: '100%',
            display: 'flex',
            position: 'relative',
          }}>A</div>
        </li>
        <li>B</li>
        <li>C</li>
      </ul>
    </>
  );
}
