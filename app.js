const auth = "563492ad6f917000010000018cc387bdef9a4f42aee5e189beb26447";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let page = 1;
let fetchLink = "";
let queryKey = "";

// add event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchInput.value);
  searchInput.value = "";
});

more.addEventListener("click", loadMore);

function generatePictures(photo) {
  const galleryImg = document.createElement("div");
  galleryImg.classList.add("gallery-img");
  galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Download</a>  
    </div>
    <img src=${photo.src.large}></img>
    `;
  gallery.appendChild(galleryImg);
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  data.photos.forEach((photo) => {
    generatePictures(photo);
  });
}

async function searchPhotos(query) {
  clear();
  queryKey = query;
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  data.photos.forEach((photo) => {
    generatePictures(photo);
  });
}

function clear() {
  gallery.innerHTML = "";
}

async function loadMore() {
  page++;
  if (queryKey) {
    fetchLink = `https://api.pexels.com/v1/search?query=${queryKey}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  data.photos.forEach((photo) => {
    generatePictures(photo);
  });
}

curatedPhotos();
