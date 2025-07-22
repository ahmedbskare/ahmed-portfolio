const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    img: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
  },
  {
    id: 2,
    title: "Inception",
    img: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg"
  },
  {
    id: 3,
    title: "Interstellar",
    img: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
  },
  {
    id: 4,
    title: "Joker",
    img: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg"
  },
];

// تحميل التقييمات من localStorage
function loadRatings() {
  const ratings = localStorage.getItem("movieRatings");
  return ratings ? JSON.parse(ratings) : {};
}

// حفظ التقييمات في localStorage
function saveRatings(ratings) {
  localStorage.setItem("movieRatings", JSON.stringify(ratings));
}

// إنشاء بطاقة الفيلم مع النجوم
function createMovieCard(movie, rating = 0) {
  const card = document.createElement("div");
  card.className = "movie-card";

  card.innerHTML = `
    <img src="${movie.img}" alt="${movie.title}" />
    <div class="movie-info">
      <h2>${movie.title}</h2>
      <div class="stars" data-movie-id="${movie.id}">
        ${[1, 2, 3, 4, 5]
          .map(
            (star) =>
              `<i class="fa-star ${star <= rating ? "fas filled" : "far"}"></i>`
          )
          .join("")}
      </div>
    </div>
  `;

  return card;
}

// تحديث التقييم على الواجهة وعند النقر
function setupRating(starsContainer, currentRating, ratings) {
  const stars = starsContainer.querySelectorAll("i");

  stars.forEach((star, index) => {
    star.style.cursor = "pointer";

    star.addEventListener("click", () => {
      const ratingValue = index + 1;
      ratings[starsContainer.dataset.movieId] = ratingValue;
      saveRatings(ratings);
      updateStarsDisplay(starsContainer, ratingValue);
    });

    star.addEventListener("mouseenter", () => {
      updateStarsDisplay(starsContainer, index + 1);
    });

    star.addEventListener("mouseleave", () => {
      updateStarsDisplay(starsContainer, currentRating);
    });
  });
}

function updateStarsDisplay(starsContainer, rating) {
  const stars = starsContainer.querySelectorAll("i");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("fas", "filled");
      star.classList.remove("far");
    } else {
      star.classList.add("far");
      star.classList.remove("fas", "filled");
    }
  });
}

function init() {
  const ratings = loadRatings();
  const moviesList = document.querySelector(".movies-list");

  movies.forEach((movie) => {
    const rating = ratings[movie.id] || 0;
    const card = createMovieCard(movie, rating);
    moviesList.appendChild(card);

    const starsContainer = card.querySelector(".stars");
    setupRating(starsContainer, rating, ratings);
  });
}

document.addEventListener("DOMContentLoaded", init);
