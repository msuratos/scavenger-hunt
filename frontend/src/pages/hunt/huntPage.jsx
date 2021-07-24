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
                        <div key={value.huntid} className="alert alert-info" role="alert">
                            <Link className="alert-link" to={"/clue/admin/" + value.huntId}>{value.hunt}</Link> 
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default huntPage;