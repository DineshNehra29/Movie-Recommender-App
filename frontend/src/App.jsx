import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { SearchBar } from "./components/Search_Bar";
import { SelectBar } from "./components/Select_Bar";
import { Recommendations } from './components/Recommendations';

function App() {
    const [results, setResults] = useState([]);
    const [movie, setMovie] = useState('');
    const [recommendations, setRecommendations] = useState({
      movies: [],
      ids: []
  });
    
    const getRecommendations = () => {
        axios.post('http://127.0.0.1:8080/recommendation', { movie })
            .then(response => {
              const data = response.data;
              setRecommendations({
                  movies: data.recommended_movies,
                  ids: data.recommended_moviesID
              });
              console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const movie_details = () => {
      axios.get(`https://api.themoviedb.org/3/movie/${recommendations.ids[0]}?api_key=9f7fba859697979135457a6896d7e968`)
      .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
    }

    useEffect(() => {
      movie_details()
    },[recommendations])

    useEffect(() => {
        console.log(recommendations);
    }, [recommendations]);

    return (
        <>
            <div className="App">
                <div className="search-bar-container">
                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && (
                        <SelectBar results={results} setMovie={setMovie} />
                    )}
                </div>
                <div className='recommendations'>
                  <Recommendations getRecommendations={getRecommendations}
                          recommendations = {recommendations}></Recommendations>
                </div>
            </div>
        </>
    );
}

export default App;
