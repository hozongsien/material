/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

TabPanel.defaultProps = {
  children: PropTypes.node,
};

const a11yProps = (index) => {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

const SimpleTabs = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [shouldDetect, setShouldDetect] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickToUpload = () => {
    // console.log('Upload file');
  };

  const handleClickToToggleDetection = () => {
    // console.log(`Prediction: ${!shouldDetect}`);
    setShouldDetect(!shouldDetect);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'secondary',
      className: classes.fab,
      icon: <CloudUploadIcon />,
      label: 'Upload',
      onClickHandler: handleClickToUpload,
    },
    {
      color: 'primary',
      className: classes.fab,
      icon: shouldDetect ? <PauseIcon /> : <PlayArrowIcon />,
      label: 'Pause/Play',
      onClickHandler: handleClickToToggleDetection,
    },
  ];

  const toTabLabel = (c, i) => {
    const label = `${i + 1}`;
    return <Tab key={i} label={label} {...a11yProps(i)} />;
  };

  const toTabPanel = (c, i, v, a) => {
    // Last item to be cloned to handle stopping of predictions
    return (
      <TabPanel key={i} index={i} value={v} dir={theme.direction}>
        {i === a.length - 1 ? React.cloneElement(c, { shouldDetect }) : c}
      </TabPanel>
    );
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          id="back-to-top-anchor"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {props.children.map((child, index) => toTabLabel(child, index))}
        </Tabs>
        {props.children.map((child, index, arr) => toTabPanel(child, index, value, arr))}
      </Paper>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index + 1}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index + 1 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={fab.onClickHandler}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </div>
  );
};

SimpleTabs.propTypes = {
  children: PropTypes.node,
};

SimpleTabs.defaultProps = {
  children: PropTypes.node,
};

export default SimpleTabs;
