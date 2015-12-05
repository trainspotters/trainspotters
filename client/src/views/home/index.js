import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../actions/counter';

export function Home ({counter, increment, decrement}) {
    return (<div>
        <div>{counter}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    </div>);
}

function mapStateToProps(counter) {
    return { counter };
}

function mapActionsToProps (dispatch) {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement())
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
