import React, {Component} from 'react';
import UpdatedComponent from './withCounter';

class ClickCounter extends Component{
    render(){
        const {count, incrementCount} = this.props;

        return(
            <>
            <button onClick={incrementCount}> {this.props.name} Clicked {count} times </button>
            {/* <p> {var1} </p>
            <p> {var2} </p> */}
            </>
        )
    }
}

export default UpdatedComponent(ClickCounter, 5) 