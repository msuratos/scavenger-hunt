import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Center, Divider, Text } from "@mantine/core";

import { getClues } from '../services/clueService';
import CluesList from '../components/CluesList';

export default function ClueAdminPage () {
    const [clues, setclues] = useState([]);
    const [createdby, setcreatedby] = useState('');
    const [image, setimage] = useState('');
    const [huntid, sethuntid] = useState('');
    const [newclues, setnewclues] = useState('');
    const [success, setsuccess] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(true);

    const params = useParams();

    const handleClueChange = (e) => setnewclues(e.value);
    const handleCreatedByChange = (e) => setcreatedby(e.value);

    const onFileChange = async (event) => {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        if (event.target.files) {
            let imageBase64 = await toBase64(event.target.files[0])
            setimage(imageBase64);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            image,
            clue: newclues,
            createdby
        };

        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(`/api/v1/clue/${huntid}`, requestOptions);
            if (!response.ok)
                seterror('Uploaded image failed 📷😥');
            else
                setsuccess('Uploaded image 📷😁');
        } catch (error) {
            seterror(error)
        }
    };

    useEffect(() => {
        const getCluesRequest = async () => {
            sethuntid(params.huntid);
            setclues(await getClues(params.huntid));
            setloading(false);
        };

        getCluesRequest();
    }, []);

    let successcomponent = (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> {success}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );

    let errorcomponent = (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong> {error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );

    return (
        <Center maw='100vw' h='100vh'>
            <Card withBorder padding="lg" radius="md" w={300} bg='var(--mantine-color-darkorange-1)'>
                {success !== '' ? successcomponent : <></>}
                {error !== '' ? errorcomponent : <></>}

                <form onSubmit={handleSubmit} style={{ margin: 'auto', textAlign: 'left' }}>
                    <Text value={newclues} onChange={handleClueChange} label="Clue for hunt" />
                    <Text value={createdby} onChange={handleCreatedByChange} label="Who are you?" />
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={onFileChange} />
                            <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                        </div>
                    </div>
                    <Button type="submit" fullWidth>Submit</Button>
                </form>

                <Divider />

                <CluesList clues={clues} loading={loading} />
            </Card>
        </Center>
    );
}