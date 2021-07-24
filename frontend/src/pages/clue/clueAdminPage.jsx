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
            newclues: '',
            success: '',
            error: ''
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
        let success = (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> {this.state.success}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );

        let error = (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Holy guacamole!</strong> {this.state.error}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );

        return (
            <div>
                { this.state.success !== '' ? success : <div></div> }
                { this.state.error !== '' ? error : <div></div> }
                <form onSubmit={this.handleSubmit} style={{width: '75%', margin: 'auto', textAlign: 'left'}}>
                    <div className="form-group">
                        <label htmlFor="clueinput">Clue</label>
                        <input id="clueinput" className="form-control" placeholder="Clue for hunt"
                            type="text" value={this.state.newclues} onChange={this.handleClueChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="createdbyinput">Created By</label>
                        <input id="createdbyinput" className="form-control" placeholder="Who are you?"
                            type="text" value={this.state.createdby} onChange={this.handleCreatedByChange} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.onFileChange} />
                            <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                        </div>
                        <div className="input-group-append">
                            <span className="input-group-text" id="">Upload</span>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
                {
                    this.state.clues.map((value, index) => (
                        <div key={value.clueId}>
                            <Clue {...value}></Clue>
                            <QRCode value={GetQrUrl() + "/clue/" + value.clueId} level={"H"} includeMargin={true} />
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
        data.clue = this.state.newclues;
        data.createdby = this.state.createdby;

        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
		fetch(`/api/v1/clue/${this.state.huntid}`, requestOptions).then(response => {
            if (!response.ok)
                this.setState({error: 'Uploaded image failed 📷😥'});
            else
                this.setState({success: 'Uploaded image 📷😁'});
		}).catch(err => {
			this.setState({ error: err });
		});
    }
}

export default ClueAdminPage;