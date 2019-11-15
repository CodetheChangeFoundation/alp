import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';


// USAGE:
{/* <TabComponent
        tabs={[
            { title: 'First Tab', content: <h1>hello</h1>},
            { title: 'Second Tab',content: <CustomButton size="small" color="primary">I am a button</CustomButton>},
            { title: 'Third Tab', content: 'Some other class'}
            ...
        ]} /> */}

class TabComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 0,
            tabs: this.props.tabs || [],
        }
    }
    topLeftPadding =2;

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
    };

    render () {
        return (
            <div>
                {/* Forming Tabs with Title */}
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="tab label"
                    >
                    {this.state.tabs.map(tab =>
                        <Tab label={tab.title} />
                    )}
                    </Tabs>
                </AppBar>

                {/* Forming the content within the tabs and linking them back to the tab by index */}
                {this.state.tabs.map((tab, index) =>
                        <Typography
                            component="div"
                            role="tabpanel"
                            hidden={this.state.value !== index}
                            id={`full-width-tabpanel-${index}`}
                            aria-labelledby={`full-width-tab-${index}`}
                        >
                            <Box p={this.topLeftPadding}>{tab.content}</Box>
                        </Typography>
                )}
            </div>
        )
    }
}

export default TabComponent
