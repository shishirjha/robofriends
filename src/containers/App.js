import React,{ Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { setSearchField } from '../actions';
// import { robots } from './robots';
import './App.css'
const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: event => dispatch(setSearchField(event.target.value))
    }
}
class App  extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField : ''
        };
    }

    componentDidMount(){
        // console.log(this.props.store.getState());
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots : users  }) );
    }
    
    // onSearchChange = (event) => {
    //     this.setState({searchField: event.target.value});
    // } now onSearchChange will be coming through props from redux
    render(){
        // const { robots, searchField } = this.state; previously both robots and searchField were the part of the state
        const { robots } = this.state; // now searchField is the part of props
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if ( robots.length === 0 ) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <CardList  robots={filteredRobots}/>
                    </Scroll>
                </div>
        
            );
        }
    }
 
};

// what connect is going to do is that it is going to read the first part of the higher functions. with mapStateToProps it is going to 
// see what part of state is changed and with mapDispatchToProps it is going to decide what is to be dispatched and then is gonna pass 
// these as props to App.js

export default connect(mapStateToProps,mapDispatchToProps)(App);