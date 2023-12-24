import './Button.css';

const CounterButton = (props) => <button className='btn' onClick={props.callback}>{props.title}</button>

export default CounterButton;