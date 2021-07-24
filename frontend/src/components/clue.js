import { Component } from "react";

class Clue extends Component {
    render() {
        const { clue, clueId, image, canSeeQR } = this.props;

        return (
            <div key={clueId}>
                <div>{clue}</div>
                {
                    image ? <img src={image} style={{width: '75%', height: 'auto'}} /> : <div></div>
                }
            </div>
        )
    }
}

export default Clue;