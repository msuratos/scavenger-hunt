function getQrUrl() {
    let url = process.env.NODE_ENV=='development' ? 'http://localhost:3001' : (`${window.location.protocol}//${window.location.hostname}`);

    return url;
}

export default getQrUrl;