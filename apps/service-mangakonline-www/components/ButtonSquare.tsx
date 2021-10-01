import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

export type ButtonSquareProps = ButtonProps & {
  component?: React.ElementType
};

const ButtonSquare = withStyles(() =>
  createStyles({
    root: {
      borderRadius: 'unset',
    }
  }),
{
  name: 'ButtonSquare'
})((props: ButtonSquareProps) => <Button {...props} />);

if (process.env.NODE_ENV !== 'production') {
  ButtonSquare.displayName = 'components__ButtonSquare';
}

ButtonSquare.defaultProps = {};

export default ButtonSquare;
