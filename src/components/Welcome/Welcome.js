import React, {Component} from 'react';

class Welcome extends Component{
    constructor(props){
        super(props)

        this.state = { message: 'Welcome Baby' }
    }


    clickHandler () {
        this.setState({ message: 'Bye baby'});
        // console.log("this", this);
    }

    render(){
       return  <div>
            <h4> {this.state.message} </h4>
            <button onClick={() => this.clickHandler()}> Click </button>
        </div>
    }
}


export default Welcome 