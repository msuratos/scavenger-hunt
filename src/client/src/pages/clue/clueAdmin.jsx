import { Component } from "react";
import GetClues from "../../services/clueService";

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
                        <div key={value.cluesid}>{value.clues}</div>
                    ))
                }
            </div>
        ) 
    }
}

export default ClueAdmin;