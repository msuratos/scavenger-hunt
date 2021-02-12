import { Component } from "react";

class Clue extends Component {
    render() {
        const { clues, cluesid, image, createdby } = this.props;

        return (
            <div key={cluesid}>
                <div>{clues}</div>
                {
                    image ? <img src={"data:image/jpeg;base64," + image} /> : <div></div>
                }
            </div>
        )
    }
}

export default Clue;