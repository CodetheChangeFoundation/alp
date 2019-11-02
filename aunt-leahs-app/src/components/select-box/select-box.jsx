import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class SelectBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: this.props.items || [],
            showItems: false,
            selectedItem : this.props.items && this.props.items[0],
        }
    }

    render(){
        return <div>
            <FormControl fullWidth={true}>
                <InputLabel id="volunteer-select-label">{this.props.name || "Select"}</InputLabel>
                <Select
                    labelId={"volunteer-select-label"}
                    id="my-select"
                    value={this.selectedItem}
                    onChange={this.selectItem}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.state.items.map(item =>
                        <MenuItem value={item.id} onClick = {() => this.selectItem(item)}>{item.value}</MenuItem>
                    )}
                </Select>
            </FormControl>
            </div>
        
        
        // <div>
        //         <div className = "select-box--box"
        //             style = {{width: this.props.width || 180}}> 
        //             <div className = "select-box--container"> 
        //                 <div className="select-box--selected-item">
        //                     {this.state.selectedItem.value}
        //                 </div>
        //                 <div 
        //                     className = "select-boc--arrow"
        //                     onClick={this.dropDown}>
        //                     <span className={`${this.state.showItems ? 'select-box-arrow-up' : 'select-box--arrow-down'}`}/>
        //                 </div>
        //                 <div
        //                     style = {{display: this.state.showItems ? 'block': 'none'}}
        //                     className = "select-box--items">
        //                     {
        //                         this.state.items.map(item => 
        //                             <div
        //                                 key={item.id}
        //                                 onClick = {() => this.selectItem(item)}
        //                                 className= {this.state.selectedItem === item ? 'selected' : ''}>
        //                             { item.value}
        //                             </div>)
        //                     }
        //                 </div>
        //         </div>
        //     </div>
        // </div>
    }
}
export default SelectBox