const fs = require('fs');

const readMovieFile = async () => {
    const rawdata = await fs.readFileSync('./movies.json');
    return JSON.parse(rawdata);
}

const writeMovieFile = async (data) => {
    await fs.writeFileSync('./movies.json', JSON.stringify(data));
}

module.exports = {
    readMovieFile,
    writeMovieFile
}