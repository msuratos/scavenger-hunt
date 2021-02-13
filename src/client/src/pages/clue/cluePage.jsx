import { Component } from 'react';
import { getClue } from '../../services/clueService';
import Clue from '../../components/clue';

class cluePage extends Component {
    state = {
        clue: []
    }

    async componentDidMount() {
        const { params } = this.props.match;
        const clue = await getClue(params.clueid);
        this.setState({clue: clue});

        console.log(this.state.clue[0]);
    }

    render() {
        return (
            <Clue {...this.state.clue[0]} />
        )
    }
}

export default cluePage;