import { Component } from 'react';
import { getHuntService } from '../../services/huntService';

class huntPage extends Component {
    state = {
        hunt: []
    }

    async componentDidMount() {
        try {
            this.setState({hunt: await getHuntService()});

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
                    this.state.hunt.map((value, index) => ( <div key={value.huntid}>{value.hunt}</div> ))
                }
            </div>
        )
    }
}

export default huntPage;