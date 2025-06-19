import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Divider, FileInput, Text } from "@mantine/core";
import { IconCamera } from '@tabler/icons-react';

import { getItems } from '../services/itemService';
import ItemsList from '../components/ItemsList';

export default function ItemAdminPage() {
  const [items, setItems] = useState([]);
  const [createdby, setcreatedby] = useState('');
  const [image, setimage] = useState('');
  const [huntid, sethuntid] = useState('');
  const [newItems, setNewItems] = useState('');
  const [success, setsuccess] = useState('');
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(true);

  const params = useParams();

  const handleItemChange = (e) => setNewItems(e.value);
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
      clue: newItems,
      createdby
    };

    console.log(data);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(`/api/v1/item/${huntid}`, requestOptions);
      if (!response.ok)
        seterror('Uploaded image failed 📷😥');
      else
        setsuccess('Uploaded image 📷😁');
    } catch (error) {
      seterror(error)
    }
  };

  useEffect(() => {
    const getItemsRequest = async () => {
      sethuntid(params.huntid);
      setItems(await getItems(params.huntid));
      setloading(false);
    };
  
    getItemsRequest();
  }, []);

  const SuccessComponent = (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success!</strong> {success}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  const ErrorComponent = (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> {error}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  return (
    <>
      {success !== '' ? SuccessComponent : <></>}
      {error !== '' ? ErrorComponent : <></>}
  
      <form onSubmit={handleSubmit}>
        <Text value={newItems} onChange={handleItemChange} label="Clue for hunt" />
        <Text value={createdby} onChange={handleCreatedByChange} label="Who are you?" />
        <div className="input-group mb-3">
          <div className="custom-file">
            <FileInput label="Item Picture" leftSection={<IconCamera />} clearable withAsterisk /> {/* TODO: connect to AI image service to convert to text */}
          </div>
        </div>
        <Button type="submit" fullWidth>Submit</Button>
      </form>

      <Divider />
  
      <ItemsList items={items} loading={loading} />
    </>
  );
}