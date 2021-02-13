import React, { Component } from 'react';
import QRCode from 'qrcode-react';

import { getClues } from '../../services/clueService';
import Clue from '../../components/clue';
import GetQrUrl from '../../config/qrUrlConfig';
import getApiUrl from '../../config/serviceConfig';

class ClueAdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clues: [],
            createdby: '',
            image: {},
            huntid: '',
            newclues: ''
        }

        this.handleClueChange = this.handleClueChange.bind(this);
        this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { params } = this.props.match;
        this.setState({huntid: params.huntid});
        this.setState({clues: await getClues(params.huntid)});
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Clue:<input type="text" value={this.state.newclues} onChange={this.handleClueChange} /></label>
                        <label>Created By:<input type="text" value={this.state.createdby} onChange={this.handleCreatedByChange} /></label>
                        <input type="file" onChange={this.onFileChange} title="Image" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                {
                    this.state.clues.map((value, index) => (
                        <div key={value.cluesid}>
                            <Clue {...value}></Clue>
                            <QRCode value={GetQrUrl() + "/clue/" + value.cluesid} level={"H"} includeMargin={true} />
                        </div>
                    ))
                }
            </div>
        ) 
    }

    handleClueChange(e) {
        this.setState({ newclues: e.target.value });
    }
    
    handleCreatedByChange(e) {
        this.setState({ createdby: e.target.value });
    }

    onFileChange = async (event) => {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        let imageBase64 = await toBase64(event.target.files[0])
		this.setState({image: imageBase64});
	}

    handleSubmit(e) {
        e.preventDefault();

        let data = {};

        data.image = this.state.image;
        data.clues = this.state.newclues;
        data.createdby = this.state.createdby;

        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
		fetch(`${getApiUrl()}/api/v1/clue/${this.state.huntid}`, requestOptions).then(response => {
            alert("File successfully uploaded");
		}).catch(err => {
			alert(err);
		});
    }
}

export default ClueAdminPage;