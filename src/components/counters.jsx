import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    
    render() { 
        return ( 
            <div>
                <button 
                    onClick={this.props.onReset} 
                    className="btn btn-warning btn-sm m-2">
                    Reset
                </button>
                {this.props.counters.map(counter => 
                    <Counter key={counter.id}
                        counter={counter}
                        onIncrement={this.props.onIncrement}
                        onDecrement={this.props.onDecrement}
                        onDelete={this.props.onDelete}
                    >
                        <h4>Item <b>{counter.name}</b></h4>
                    </Counter>
                    )}
            </div>
         );
    }
}
 
export default Counters;