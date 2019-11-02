import React from 'react'
import './styles.css'

class SelectBox extends React.Component{
    state ={
        items: this.props.items || [],
        showItems: false,
        selectedItem : this.props.items && this.props.items[0],
    }


    dropDown = () => {
        this.setState(prevState => ({
            showItems : !prevState.showItems,
        }))
    }

    selectItem = (item) => this.setState({
        selectedItem : item,
        showItems: false,
    })
    
    render(){
        return <div>
                <div className = "select-box--box"
                    style = {{width: this.props.width || 180}}> 
                    <div className = "select-box--container"> 
                        <div className="select-box--selected-item">
                            {this.state.selectedItem.value}
                        </div>
                        <div 
                            className = "select-boc--arrow"
                            onClick={this.dropDown}>
                            <span className={`${this.state.showItems ? 'select-box-arrow-up' : 'select-box--arrow-down'}`}/>
                        </div>
                        <div
                            style = {{display: this.state.showItems ? 'block': 'none'}}
                            className = "select-box--items">
                            {
                                this.state.items.map(item => 
                                    <div
                                        key={item.id}
                                        onClick = {() => this.selectItem(item)}
                                        className= {this.state.selectedItem === item ? 'selected' : ''}>
                                    { item.value}
                                    </div>)
                            }
                        </div>
                </div>
            </div>
        </div>
    }
}
export default SelectBox