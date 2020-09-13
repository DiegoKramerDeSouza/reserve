import React, { Component } from 'react';

class Counter extends Component {
    state = {
        tags: ['tag1', 'tag2', 'tag3']
    };

    // 1st solution to bind this to event handler
    // constructor(){
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }

    styles = {
        fontSize: 16,
        fontWeight: "bold"
    }
    product = {
        id: 1
    }

    render() { 
        return (
            <React.Fragment>
                {this.props.children}
                <button 
                    onClick={() => this.props.onDecrement(this.props.counter)} 
                    style={{fontSize: 12}} 
                    className="btn btn-secondary btn-sm"
                    disabled={this.props.counter.value <= 0}
                >
                    -
                </button>
                <span style={this.styles} className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button 
                    onClick={() => this.props.onIncrement(this.props.counter)} 
                    style={{fontSize: 12}} 
                    className="btn btn-secondary btn-sm"
                >
                    +
                </button>
                <button 
                    onClick={ () => this.props.onDelete(this.props.counter.id)} 
                    className="btn btn-danger btn-sm m-2">
                    Delete
                </button>

                {this.state.tags && this.state.tags.length === 0 && "Please create new tags"}
                {this.renderTags()}
            </React.Fragment>
        );
    }

    renderTags = () => {
        if(this.state.tags && this.state.tags.length ===0) return (<p>No Tags</p>);
        return (<ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>);
    }

    getBadgeClasses = () => {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount = () => {
        const {value} = this.props.counter;
        return value === 0 ? 'Zero' : value;
    }
}
 
export default Counter;