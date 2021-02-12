import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Component } from 'react';
import GetHunt from '../../services/huntService';

class huntPage extends Component {
    state = {
        hunt: []
    }

    async componentDidMount() {
        try {
            this.setState({hunt: await GetHunt()});

            console.log('Hunt state', this.state.hunt);
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.hunt.map((value, index) => ( 
                        <Link to={"/clue/admin/" + value.huntid}>{value.hunt}</Link> 
                    ))
                }
            </div>
        )
    }
}

export default huntPage;