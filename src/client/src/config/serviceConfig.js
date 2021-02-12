function getApiUrl() {
    let url = process.env.NODE_ENV=='development' ? 'http://localhost:3001' : '';
    console.log(url);

    return url;
}

export default getApiUrl;