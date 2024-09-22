import React, {Component} from 'react';
import UpdatedComponent from './withCounter';

class hoverCounter extends Component{
    render(){
        const {count, incrementCount} = this.props;

        return(
            <h2 onMouseOver={incrementCount}> {this.props.name} Hovered {count} times </h2>
        )
    }
}

export default UpdatedComponent(hoverCounter, 10) 