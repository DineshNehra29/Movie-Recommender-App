import React from 'react'
import "./Recommendations.css"
export const Recommendations = ({getRecommendations, recommendations}) => {
  return (
    <div>
        <button onClick={getRecommendations}>Get Recommendations</button>
    <ul>
        {recommendations.movies.map((rec, index) => (
            <li key={index}>{rec}</li>
        ))}
    </ul></div>
  )
}

