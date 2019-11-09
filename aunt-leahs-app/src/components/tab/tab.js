import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


// USAGE:
{/* <TabComponent
        name = "Tab"
        items={[
            { title: 'First Tab', content: <h1>hello</h1>},
            { title: 'Second Tab',content: <CustomButton size="small" color="primary">I am a button</CustomButton>},
            { title: 'Third Tab', content: 'Some other class'}
            ...
        ]} /> */}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}
  
TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
};

  
class TabComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0,
            items: this.props.items || [],
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
    };

    render () {return <div>
        <AppBar position="static" color="default">
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="tab label"
            >
            {this.state.items.map(item =>
                <Tab label={item.title} />
            )}
            </Tabs>
        </AppBar>
        {this.state.items.map((item, index) =>
            <TabPanel
                value={this.state.value}
                index={index}
            >
                {item.content}
            </TabPanel>
        )}
      </div>
    }
  }

export default TabComponent
