import { Component } from "react";

class Clue extends Component {
    render() {
        const { clues, cluesid, image, canSeeQR } = this.props;

        return (
            <div key={cluesid}>
                <div>{clues}</div>
                {
                    image ? <img src={image} style={{width: '75%', height: 'auto'}} /> : <div></div>
                }
            </div>
        )
    }
}

export default Clue;