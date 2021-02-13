function getApiUrl() {
    let url = process.env.NODE_ENV=='development' ? 'http://localhost:3001' : '';

    return url;
}

export default getApiUrl;