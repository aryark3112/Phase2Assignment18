document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList")
    const createMovieForm = document.getElementById("createMovieForm");
    const updateMovieForm = document.getElementById("updateMovieForm");
    const deleteMovieForm = document.getElementById("deleteMovieForm");

    //Function to fetch and display movies
    function displayMovies() {
        fetch("http://localhost:5052/api/movies")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(movies => {
                movieList.innerHTML = ""; //Clear previous List
                movies.forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${movie.id}, title: ${movie.title}, Description: ${movie.description}, Due Date: ${movie.dueDate}`;
                    movieList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
                movieList.innerHTML = "Error fetching movies.";
            });
    }

    //Event listener for Create Movie form submission
    createMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;

        fetch("http://localhost:5052/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, dueDate })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //clear form fields after successful creation
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("dueDate").value = "";

                //Refresh the movie list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });

    //Event listener for Update Task form submission
    updateMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const movieId = document.getElementById("movieId").value;
        const newTitle = document.getElementById("newTitle").value;

        fetch("http://localhost:5052/api/movies/${movieId}", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Id: movieId, title: newTitle })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //clear form fields after successful update
                document.getElementById("movieId").value = "";
                document.getElementById("newTitle").value = "";

                //Refresh the task list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });

    deleteMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const deleteMovieId = document.getElementById("deleteMovieId").value;

        fetch("http://localhost:5052/api/movies/${deleteMovieId}", {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //Clear form field after successful deletion
                document.getElementById("deleteTaskId").value = "";

                //Refresh the movie list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });
    //Initail display of movies when the page loads
    displayMovies();
});