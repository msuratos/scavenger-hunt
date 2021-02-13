import { Component } from 'react';
import QRCode from 'qrcode-react';

import { getClues } from '../../services/clueService';
import Clue from '../../components/clue';
import GetQrUrl from '../../config/qrUrlConfig';

class ClueAdminPage extends Component {
    state = {
        clues: []
    }

    async componentDidMount() {
        const { params } = this.props.match;
        this.setState({clues: await getClues(params.huntid)});
    }

    render() {
        return (
            <div>
                {
                    this.state.clues.map((value, index) => (
                        <div key={value.cluesid}>
                            <Clue {...value}></Clue>
                            <QRCode value={GetQrUrl() + "/clue/" + value.cluesid} size={290} level={"H"} includeMargin={true} />
                        </div>
                    ))
                }
            </div>
        ) 
    }
}

export default ClueAdminPage;