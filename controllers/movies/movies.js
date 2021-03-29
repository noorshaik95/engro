const {readMovieFile, writeMovieFile} = require('../../utils');
module.exports = {
    addMovieDetails,
    getMovieDetails,
    updateMovieDetails,
    deleteMovieDetails,
    getMoviesCountByGenre,
    getMoviesCountByYear
}


async function addMovieDetails(movieData) {
    try {
        const movies = await readMovieFile();
        movies.push(movieData);
        await writeMovieFile(movies);
        return movies;
    } catch (ex) {
        throw ex;
    }
}

async function getMovieDetails(title) {
    try {
        const movies = await readMovieFile();
        const regex = new RegExp(title, 'i');
        return movies.filter((movie) => movie.title.match(regex));
    } catch (ex) {
        throw ex;
    }
}

async function updateMovieDetails(title, movieData) {
    try {
        const movies = await readMovieFile();
        let index = -1;
        const filteredList = movies.filter((movie, i) => {
            if(movie.title === title) {
                index = i;
                return movie;
            }
        });
        if(filteredList.length === 0) {
            throw new Error("Title not found");
        }
        if(filteredList.length > 1) {
            throw new Error("Title is not unique");
        }
        movies[index] = movieData;
        await writeMovieFile(movies);
        return movies;
    } catch (ex) {
        throw ex;
    }
}

async function deleteMovieDetails(title) {
    try {
        const movies = await readMovieFile();
        const filteredList = movies.filter((movie, i) => {
            if(movie.title === title) {
                return movie;
            }
        });
        if(filteredList.length === movies.length) {
            throw new Error("Title not found");
        }
        await writeMovieFile(filteredList);
        return filteredList;    
    } catch (ex) {
        throw ex;
    }
}

async function getMoviesCountByGenre() {
    try {
        const movies = await readMovieFile();
        const genreMap = {};
        movies.map((movie) =>{ 
            if(!genreMap[movie.majorGenre]) {
                genreMap[movie.majorGenre] = {
                    genre: movie.majorGenre,
                    count: 0
                };
            }
            genreMap[movie.majorGenre].count++;
        });
        return Object.values(genreMap);
    } catch (ex) {
        throw ex;
    }
}

async function getMoviesCountByYear() {
    try {
        const movies = await readMovieFile();
        const yearMap = {};
        movies.map((movie) =>{ 
            const releaseDate = movie.releaseDate.split(" ");
            const releaseYear = releaseDate[2];
            if(!yearMap[releaseYear]) {
                yearMap[releaseYear] = {
                    releaseYear,
                    count: 0
                };
            }
            yearMap[releaseYear].count++;
        });
        return Object.values(yearMap);    
    } catch (ex) {
        throw ex;
    }
}
