import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//How to Call this class from another class:
{/* <TabComponent
        name = "Tab"
        items={[
            { title: 'First Tab', content: <h1>hello</h1>},
            { title: 'Second Tab',content: <CustomButton size="small" color="primary">I am a button</CustomButton>},
            { title: 'Third Tab', content: 'Some other class'}
            ...
        ]} /> */}

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
    
    render () {
        return  <div className={this.props.name || "TabComponent"}>
        <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleChange} aria-label= "simple tabs example">
                {this.state.items.map((item, index) =>
                    <Tab label={item.title} {...a11yProps(index)} />
                )}
            </Tabs>
        </AppBar>
        {this.state.items.map((item, index) =>
            <TabPanel value={this.state.value} index={index}>
                {item.content}
            </TabPanel>
        )}
    </div>
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default TabComponent
