export async function createHunt(values) {
  try {
    const response = await fetch('/api/v1/hunt', { method: 'POST', body: JSON.stringify(values), headers: { 'Content-Type': 'application/json' }});
    const hunt = await response.json();
    return hunt;
  }
  catch (err) {
    console.error('Creating hunt failed', err);
    throw err;
  }
}

export async function getHunt(huntId, code) {
  try {
    let urlPath = '/api/v1/hunt';

    if (huntId) urlPath += `?huntId=${huntId}`;
    else if (code) urlPath += `?code=${code}`;

    const response = await fetch(urlPath);
    if (response.redirected) {
      window.location = response.url;
      return;
    }
    else if (!response.ok) {
      throw Error(await response.text());
    }

    const hunt = await response.json();
    return hunt;
  }
  catch (err) {
    console.error('Geting hunt details failed', err);
    throw err;
  }
}

export async function getHunts() {
  try {
    const response = await fetch('/api/v1/hunt/all');
    const hunts = await response.json();
    return hunts;
  }
  catch (err) {
    console.error(`Get hunts failed`, err);
    throw err;
  }
}

export async function joinHunt(huntCode, playerName) {
  try {
    const response = await fetch('/api/v1/hunt/join', {
      method: 'POST',
      body: JSON.stringify({ code: huntCode, playerName }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const hunt = await response.json();
    return hunt;
  }
  catch (err) {
    console.error(`Failed to join hunt`, err);
    throw err;
  }
}

export async function setStatus(huntId, status) {
  try {
    const response = await fetch(`/api/v1/hunt/${huntId}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw Error(await response.text());
    }
  }
  catch (err) {
    console.error(`Setting hunt status failed`, err);
    throw err;
  }
}