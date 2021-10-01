import * as React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AppBar, ToolbarSection } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Drawer from '../../components/Drawer';

const debug = require('debug')('admin:containers:Navbar');

type INavbarProps = {
    children?: React.ReactNode,
}

const Navbar = React.forwardRef(function Navbar({ children }: INavbarProps, ref: React.Ref<HTMLElement>) {
  debug('render');

  const [drawerStatus, setDrawerStatus] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus);
  };

  return (
    <>
      <Drawer open={drawerStatus} toggleDrawer={toggleDrawer} />
      <AppBar ref={ref}>
        <Toolbar>
          <ToolbarSection
            start
            style={{
              flex: 2,
            }}
          >
            <Typography variant="h5" style={{
              marginLeft: 16
            }}>
                            MÁY SẤY TÓC TẠO KIỂU DELIYA
            </Typography>
          </ToolbarSection>
          <ToolbarSection end style={{
            alignItems: 'center',
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap',
            boxSizing: 'border-box'
          }}>
            <Typography variant="body2" style={{
              marginRight: 16
            }}>
                            ₫55.000
            </Typography>
            <Button color="primary" variant="contained" disableElevation style={{
              padding: '20px 45px',
              borderRadius: 0
            }}>
                            Buy
            </Button>
          </ToolbarSection>

        </Toolbar>
        {children}

      </AppBar>
    </>
  );
});

Navbar.displayName = 'Navbar';

Navbar.defaultProps = {};

export default React.memo(Navbar);
