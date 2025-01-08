from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
import pickle
import pandas as pd # type: ignore
app = Flask(__name__)
CORS(app)

movie_list = pickle.load(open('movies.pkl','rb'))
similarity = pickle.load(open('similarity.pkl','rb'))

@app.route("/allmovies", methods=['GET'])
def allmovies():
    return jsonify(
        {'all_movies': movie_list['title'].values.tolist()})
    
@app.route("/recommendation", methods=['POST'])
def recommend():
    data = request.get_json()
    movie = data.get('movie')
    index = movie_list[movie_list['title'] == movie].index[0]
    distance = similarity[index]
    movies = sorted(list(enumerate(distance)),reverse=True,key=lambda x:x[1])[1:7]
    recommended_movies = []
    recommended_moviesID = []
    for i in movies:
        recommended_movies.append(movie_list.iloc[i[0]].title)
        recommended_moviesID.append(int(movie_list.iloc[i[0]].id)) 
    #return {recommended_movies, recommended_moviesID}
    return jsonify({"recommended_movies": recommended_movies, "recommended_moviesID": recommended_moviesID})


if __name__ == '__main__' :
    app.run(debug = True , port = 8080)
