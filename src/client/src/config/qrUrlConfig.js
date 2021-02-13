function getQrUrl() {
    let url = process.env.NODE_ENV=='development' ? 'http://localhost:3001' : window.location.href;
    console.log('QR Base Url', url);

    return url;
}

export default getQrUrl;