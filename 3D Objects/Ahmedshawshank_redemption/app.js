// تحميل التقييمات من localStorage
function loadRatings() {
  const ratings = localStorage.getItem("movieRatings");
  return ratings ? JSON.parse(ratings) : {};
}

// حفظ التقييمات في localStorage
function saveRatings(ratings) {
  localStorage.setItem("movieRatings", JSON.stringify(ratings));
}

// تحديث عرض النجوم
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

// إعداد التفاعل مع النجوم
function setupRating(starsContainer, currentRating, movieId, ratings) {
  const stars = starsContainer.querySelectorAll("i");

  stars.forEach((star, index) => {
    star.style.cursor = "pointer";

    star.addEventListener("click", () => {
      const ratingValue = index + 1;
      ratings[movieId] = ratingValue;
      saveRatings(ratings);
      updateStarsDisplay(starsContainer, ratingValue);
    });

    star.addEventListener("mouseenter", () => {
      updateStarsDisplay(starsContainer, index + 1);
    });

    star.addEventListener("mouseleave", () => {
      updateStarsDisplay(starsContainer, ratings[movieId] || 0);
    });
  });
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const ratings = loadRatings();

  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    const movieId = card.dataset.id;
    const starsContainer = card.querySelector(".stars");
    const rating = ratings[movieId] || 0;

    updateStarsDisplay(starsContainer, rating);
    setupRating(starsContainer, rating, movieId, ratings);
  });
});
