import { Component } from 'react';
import GetClues from '../../services/clueService';
import Clue from '../../components/clue';

class ClueAdmin extends Component {
    state = {
        clues: []
    }

    async componentDidMount() {
        const { params } = this.props.match;
        this.setState({clues: await GetClues(params.huntid)});
    }

    render() {
        return (
            <div>
                {
                    this.state.clues.map((value, index) => (
                        <Clue {...value} key={value.cluesid}></Clue>
                    ))
                }
            </div>
        ) 
    }
}

export default ClueAdmin;