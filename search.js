const ul = document.querySelector("ul");
const bouton = document.querySelector("button");
const lien = " https://www.omdbapi.com/";
const apikey = "&apikey=f6e256e1";
const plot = "&plot=full";
const imbdlink = "https://www.imdb.com/title/";
const input = document.querySelector("input");
bouton.onclick = function () {
  let movieList = document.querySelector("#movieList");
  movieList.innerHTML = "";

  const inputvalue = input.value;

  const requestURL = lien + "?s=" + inputvalue + apikey;
  console.log(requestURL);
  let request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = async function () {
    const reponse = request.response;
    console.table(reponse);
    const longueur = reponse.Search.length;

    for (let i = 0; i < longueur - 1; i++) {
      let movie = await getMovie(reponse.Search[i].imdbID);
      let newdiv = buildHtml(movie);

      movieList.appendChild(newdiv);
    }
  }
};

async function getMovie(movieId) {
  const response = await fetch(lien + "?i=" + movieId + apikey)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return response;
}

function buildHtml(movies) {
  const link = "https://www.imdb.com/title/";
  const html = document.createElement("div");
  html.classList = "col-lg-4";
  html.innerHTML = `
      <div class="card shadow-lg">
        <img src="${movies.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <div class="text-center">
            <h5 class="card-title">${movies.Title}</h5>
          </div>
          <div class="text-center">
            <button class="description" data-toggle="collapse" data-bs-toggle="collapse" href="#desc-infos" role="button" aria-expanded="false" aria-controls="desc-infos">
              Description
            </button>
          </div>
          <div class="collapse text-center" id="desc-infos">
            <div class="card-body">
            ${movies.Plot}
            </div>
          </div>
          <div class="text-end">
            <a class="more-infos" href="${link+movies.imdbID}" target="_blank">more infos <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
  `;

  return html;
}
