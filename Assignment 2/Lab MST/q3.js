var movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi" },
    { id: 2, title: "Interstellar", genre: "Sci-Fi" },
    { id: 3, title: "The Dark Knight", genre: "Action" },
    { id: 4, title: "Avengers", genre: "Action" },
    { id: 5, title: "The Hangover", genre: "Comedy" },
    { id: 6, title: "Home Alone", genre: "Comedy" }
];

var reviews = {
    "1-alice": { username: "Alice", text: "Amazing movie with great visuals.", type: "positive", movieId: 1 },
    "1-bob": { username: "Bob", text: "Too confusing for me.", type: "negative", movieId: 1 },
    "2-charlie": { username: "Charlie", text: "A beautiful space movie.", type: "positive", movieId: 2 },
    "3-dave": { username: "Dave", text: "Best superhero movie ever!", type: "positive", movieId: 3 },
    "3-eve": { username: "Eve", text: "It was okay, nothing special.", type: "neutral", movieId: 3 },
    "4-frank": { username: "Frank", text: "Too many characters.", type: "negative", movieId: 4 },
    "4-grace": { username: "Grace", text: "Fun movie with good action.", type: "positive", movieId: 4 },
    "5-henry": { username: "Henry", text: "Very funny, enjoyed it.", type: "positive", movieId: 5 },
    "5-ivy": { username: "Ivy", text: "Average comedy, not great.", type: "neutral", movieId: 5 },
    "6-jack": { username: "Jack", text: "Boring and outdated.", type: "negative", movieId: 6 }
};

var genres = [];
for (var i = 0; i < movies.length; i++) {
    if (genres.indexOf(movies[i].genre) === -1) {
        genres.push(movies[i].genre);
    }
}

var genreDropdown = document.getElementById("genreFilter");
for (var i = 0; i < genres.length; i++) {
    var opt = document.createElement("option");
    opt.value = genres[i];
    opt.textContent = genres[i];
    genreDropdown.appendChild(opt);
}

function getReviewFilter() {
    return document.getElementById("reviewFilter").value;
}

function render() {
    var app = document.getElementById("app");
    app.innerHTML = "";
    var selectedGenre = document.getElementById("genreFilter").value;
    var selectedReviewType = getReviewFilter();

    for (var g = 0; g < genres.length; g++) {
        var genre = genres[g];
        if (selectedGenre !== "all" && genre !== selectedGenre) continue;

        var section = document.createElement("div");
        section.className = "genre-section";

        var title = document.createElement("h2");
        title.className = "genre-title";
        title.textContent = genre;
        section.appendChild(title);

        for (var m = 0; m < movies.length; m++) {
            if (movies[m].genre === genre) {
                section.appendChild(createMovieCard(movies[m], selectedReviewType));
            }
        }

        app.appendChild(section);
    }
}

function createMovieCard(movie, reviewFilter) {
    var card = document.createElement("div");
    card.className = "movie-card";
    card.id = "movie-" + movie.id;

    var name = document.createElement("div");
    name.className = "movie-title";
    name.textContent = movie.title;
    card.appendChild(name);

    var form = document.createElement("div");
    form.className = "review-form";

    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Your Name";
    nameInput.id = "name-" + movie.id;

    var typeSelect = document.createElement("select");
    typeSelect.id = "type-" + movie.id;
    var opt1 = document.createElement("option");
    opt1.value = "positive";
    opt1.textContent = "Positive";
    var opt2 = document.createElement("option");
    opt2.value = "neutral";
    opt2.textContent = "Neutral";
    var opt3 = document.createElement("option");
    opt3.value = "negative";
    opt3.textContent = "Negative";
    typeSelect.appendChild(opt1);
    typeSelect.appendChild(opt2);
    typeSelect.appendChild(opt3);

    var textArea = document.createElement("textarea");
    textArea.placeholder = "Write your review...";
    textArea.id = "text-" + movie.id;

    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Review";
    submitBtn.onclick = (function (mid) {
        return function () {
            submitReview(mid);
        };
    })(movie.id);

    form.appendChild(nameInput);
    form.appendChild(typeSelect);
    form.appendChild(textArea);
    form.appendChild(submitBtn);
    card.appendChild(form);

    var reviewsDiv = document.createElement("div");
    reviewsDiv.id = "reviews-" + movie.id;
    card.appendChild(reviewsDiv);

    showReviews(movie.id, reviewFilter, reviewsDiv);

    return card;
}

function submitReview(movieId) {
    var username = document.getElementById("name-" + movieId).value.trim();
    var type = document.getElementById("type-" + movieId).value;
    var text = document.getElementById("text-" + movieId).value.trim();

    if (username === "" || text === "") {
        alert("Please enter your name and review.");
        return;
    }

    var key = movieId + "-" + username.toLowerCase();

    if (reviews[key] && !confirm("You already reviewed this movie. Do you want to edit your review?")) {
        return;
    }

    reviews[key] = {
        username: username,
        text: text,
        type: type,
        movieId: movieId
    };

    document.getElementById("name-" + movieId).value = "";
    document.getElementById("text-" + movieId).value = "";

    showReviews(movieId, getReviewFilter());
}

function showReviews(movieId, filter, container) {
    if (!container) {
        container = document.getElementById("reviews-" + movieId);
    }
    container.innerHTML = "";

    for (var key in reviews) {
        var r = reviews[key];
        if (r.movieId !== movieId) continue;
        if (filter !== "all" && r.type !== filter) continue;

        var box = document.createElement("div");
        box.className = "review-box " + r.type;

        var info = document.createElement("strong");
        info.textContent = r.username + " (" + r.type + ")";
        box.appendChild(info);

        var p = document.createElement("p");
        p.textContent = r.text;
        box.appendChild(p);

        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = (function (rKey, mid) {
            return function () {
                editReview(rKey, mid);
            };
        })(key, movieId);
        box.appendChild(editBtn);

        container.appendChild(box);
    }
}

function editReview(key, movieId) {
    var r = reviews[key];
    document.getElementById("name-" + movieId).value = r.username;
    document.getElementById("type-" + movieId).value = r.type;
    document.getElementById("text-" + movieId).value = r.text;
}

render();
