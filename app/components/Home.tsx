import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Circle from '@material-ui/icons/FiberManualRecord';
import { remote } from 'electron';
import React, { ReactNode } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Decryption from './Decrypt/Decrypt';
import Encryption from './Encrypt/Encrypt';
import KeyPairs from './KeyPairs/KeyPairs';

interface TabPanelProps {
  children: ReactNode;
  dir: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, dir } = props;

  return (
    <div>
      {value === index && (
        <Box p={3}>
          <Typography style={{ height: '100vh' }} component="span">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#313131',
    height: '550',
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root} style={{ height: '100%' }}>
      <AppBar position="fixed" elevation={0} color="default">
        <span
          style={{
            WebkitUserSelect: 'none',
            WebkitAppRegion: 'drag',
            display: 'block',
            backgroundColor: '#444444',
          }}
        >
          <Circle
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#882e2c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#fc5753';
            }}
            style={{
              transition: '.2s',
              color: '#fc5753',
              WebkitAppRegion: 'no-drag',
            }}
            onClick={() => {
              remote.getCurrentWindow().close();
            }}
          />
          <Circle
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#846324';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#fdbc40';
            }}
            style={{
              transition: '.2s',
              color: '#fdbc40',
              WebkitAppRegion: 'no-drag',
            }}
            onClick={() => {
              remote.getCurrentWindow().minimize();
            }}
          />
          <Circle
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#175d21';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#33c748';
            }}
            style={{
              transition: '.2s',
              color: '#33c748',
              WebkitAppRegion: 'no-drag',
            }}
            onClick={() => {
              if (!remote.getCurrentWindow().isMaximized()) {
                remote.getCurrentWindow().maximize();
              } else {
                remote.getCurrentWindow().unmaximize();
              }
            }}
          />
        </span>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { backgroundColor: '#ffae00' } }}
          indicatorColor="primary"
          style={{ backgroundColor: '#444444' }}
          textColor="primary"
          variant="fullWidth"
        >
          <Tab style={{ color: '#ffae00' }} label="Key Pairs" />
          <Tab style={{ color: '#ffae00' }} label="Encryption" />
          <Tab style={{ color: '#ffae00' }} label="Decryption" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        style={{ marginTop: '70px' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <KeyPairs />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Encryption />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Decryption />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default Home;
