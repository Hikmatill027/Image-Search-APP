const accessKey = "y9e1caZbZsxVrEYTcOITkQCKME_Fh8AMqEbARG7aMlo";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if ([page === 1]) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const container = document.createElement("div");
    container.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    container.appendChild(image);
    container.appendChild(imageLink);
    searchResults.appendChild(container);
  });
  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}
// event listeners
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
showMore.addEventListener("click", () => {
  searchImages();
});
