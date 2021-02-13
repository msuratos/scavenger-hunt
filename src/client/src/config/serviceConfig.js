function getApiUrl() {
    let url = process.env.NODE_ENV=='development' ? 'http://localhost:3001' : window.location.href;

    return url;
}

export default getApiUrl;