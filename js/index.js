const urlServerMovies = 'http://localhost:3000/movies/'
const domMovies = document.getElementById('movies')
const btnAddMovie = document.getElementById('add-movie')
const sectionAddMovie = document.getElementById('section-add-movie')
const btnCancelAddMovie = document.getElementById('cancel-add-btn')
const navBarBtn = document.getElementById('nav-button')
const sectionNavBar = document.getElementById('filter-list')
const searchInput = document.getElementById('search')

let letFetch
let movies = []
let topIdMovie = 0
domMovies.innerHTML = ``
searchInput.addEventListener('keyup', (e) => {
  letFetch = e.target.value
  fetch(urlServerMovies)
  .then(response => response.json())
  .then(data => {
    movies = data
  let filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(letFetch.toLowerCase()) || movie.category.toLowerCase().includes(letFetch.toLowerCase()) || movie.director.toLowerCase().includes(letFetch.toLowerCase()) || movie.year.toLowerCase().includes(letFetch.toLowerCase()))
    viewMovies(filteredMovies)
  })
})

navBarBtn.addEventListener('click', () => {
  if (navBarBtn.getAttribute('active') === 'false') {
    navBarBtn.setAttribute('active', 'true')
    sectionNavBar.classList.remove('hide-filter-list')
    sectionNavBar.classList.add('filter-list')
    return
  }
  if (navBarBtn.getAttribute('active') === 'true') {
    navBarBtn.setAttribute('active', 'false')
    sectionNavBar.classList.remove('filter-list')
    sectionNavBar.classList.add('hide-filter-list')
    return
  }
})

btnAddMovie.addEventListener('click', () => {
  if (btnAddMovie.getAttribute('active') === 'false') {
    btnAddMovie.setAttribute('active', 'true')
    sectionAddMovie.classList.remove('hide-add-movie')
    sectionAddMovie.classList.add('view-add-movie')
    return
  }
  if (btnAddMovie.getAttribute('active') === 'true') {
    btnAddMovie.setAttribute('active', 'false')
    sectionAddMovie.classList.remove('view-add-movie')
    sectionAddMovie.classList.add('hide-add-movie')
    addMovie()
    // reset form values after submit
    document.getElementById('title').value = ''
    document.getElementById('category').value = ''
    document.getElementById('director').value = ''
    document.getElementById('year').value = ''
    document.getElementById('plot').value = ''
    document.getElementById('time').value = ''
    document.getElementById('cast').value = ''
    document.getElementById('rating').value = ''
    document.getElementById('comment').value = ''
    document.getElementById('img').value = ''
    return
  }
})

btnCancelAddMovie.addEventListener('click', () => {
  document. location. reload()
})

function getMovies() {
  letFetch = fetch('movies.json')
    .then(response => response.json())
    .then(data => {
      movies = data.movies
      idMovies()
    })
    .then(() => {
      viewMovies(movies)
    })
}

getMovies()

function modalInfoMovie(id) {
  const modalInfo = document.getElementById(`info-movie-${id}`)
  modalInfo.classList.remove('hide-info-movie')
  modalInfo.classList.add('view-info-movie')
}

function cancelModalInfo(id) {
  const modalInfo = document.getElementById(`info-movie-${id}`)
  modalInfo.classList.remove('view-info-movie')
  modalInfo.classList.add('hide-info-movie')
}

function modalEditMovie(id) {
  const modalEdit = document.getElementById(`edit-movie-${id}`)
  modalEdit.classList.remove('hide-edit-movie')
  modalEdit.classList.add('view-edit-movie')
}

function cancelModalEdit(id) {
  const modalEdit = document.getElementById(`edit-movie-${id}`)
  modalEdit.classList.remove('view-edit-movie')
  modalEdit.classList.add('hide-edit-movie')
}

function modalDeleteMovie(id) {
  const modalDelete = document.getElementById(`delete-movie-${id}`)
  modalDelete.classList.remove('hide-delete-movie')
  modalDelete.classList.add('view-delete-movie')
}

function cancelModalDelete(id) {
  const modalDelete = document.getElementById(`delete-movie-${id}`)
  modalDelete.classList.remove('view-delete-movie')
  modalDelete.classList.add('hide-delete-movie')
}

function editMovie(id) {
  console.log(id)
  const title = `edit-title-${id}`
  const category = `edit-category-${id}`
  const director = `edit-director-${id}`
  const year = `edit-year-${id}`
  const time = `edit-time-${id}`
  const plot = `edit-plot-${id}`
  const cast = `edit-cast-${id}`
  const rating = `edit-rating-${id}`
  const comment = `edit-comment-${id}`
  const img = `edit-img-${id}`
  const movie = {
    id,
    title: document.getElementById(title).value,
    category: document.getElementById(category).value,
    director: document.getElementById(director).value,
    year: document.getElementById(year).value,
    time: document.getElementById(time).value,
    plot: document.getElementById(plot).value,
    cast: document.getElementById(cast).value,
    rating: document.getElementById(rating).value,
    comment: document.getElementById(comment).value,
    img: document.getElementById(img).value,
  }
  console.log(title)
  console.log(document.getElementById(title).value)
  fetch(urlServerMovies + id, {
    method: 'PUT',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      cancelModalEdit(id)
      viewMovies(movies)
    })
}

function deleteMovie(id) {
  fetch(urlServerMovies + id, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      viewMovies(data)
    })
}

function idMovies() {
  movies.forEach(movie => {
    if (movie.id > topIdMovie) {
      topIdMovie = movie.id
    }
  })
}

function addMovie() {
  const title = document.getElementById('title').value
  const category = document.getElementById('category').value
  const director = document.getElementById('director').value
  const year = document.getElementById('year').value
  const plot = document.getElementById('plot').value
  const time = document.getElementById('time').value
  const cast = document.getElementById('cast').value
  const rating = document.getElementById('rating').value
  const comment = document.getElementById('comment').value
  const img = document.getElementById('img').value
  const id = topIdMovie + 1

  if (title === '' || category === '' || director === '' || year === '' || plot === '' || time === '' || cast === '' || rating === '') {
    alert('Please fill all fields')
    return
  }
  
  const movie = {
    id,
    title,
    category,
    director,
    year,
    plot,
    time,
    cast,
    rating,
    comment,
    img,
  }
  fetch(urlServerMovies, {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
    .then(response => response.json())
    .then(data => {
      viewMovies(data)
    })
}

function viewMovies(movies) {
  domMovies.innerHTML = ``
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]
    const movieId = "movie-" + movie.id
    const infoMovieId = "info-movie-" + movie.id
    const deleteMovieId = "delete-movie-" + movie.id
    const editMovieId = "edit-movie-" + movie.id

    if (movie.img === "" || movie.img === null || movie.img === undefined) {
      movie.img = "./assets/img/default.png"
    }

    let categories = movie.category
    let categoriesArray = categories.split(',')
    let viewCategories = ``
    for (let i = 0; i < categoriesArray.length; i++) {
      viewCategories += `<span class="category">${categoriesArray[i]}</span>`
    }

    let rating = ``
    let ratingNumber = parseFloat(movie.rating)
    let ratingDecimal = ratingNumber - Math.floor(ratingNumber)
    let ratingInteger = Math.floor(ratingNumber)
    let ratingHalf = 0
    if (ratingDecimal > .3) {
      ratingHalf = 1    
    }
    for (let i = 0; i < ratingInteger; i++) {
      rating += `<img src="./assets/svg/star.svg" alt="star-full" class="star-full">`
    }
    if (ratingHalf === 1) {
      rating += `<img src="./assets/svg/star-half-full.svg" alt="star-half" class="star-half">`
    }
    for (let i = 0; i < (5 - ratingInteger - ratingHalf); i++) {
      rating += `<img src="./assets/svg/star-outline.svg" alt="star-empty" class="star-empty">`
    }





    domMovies.innerHTML += 
    `
      <div class="movie" id="${movieId}">
        <div class="bg-filter">
          <h2>${movie.title}</h2>
          <div id="${deleteMovieId}" class="hide-delete-movie"></div>
          <div id="${editMovieId}" class="hide-edit-movie"></div>
          <div id="${infoMovieId}" class="hide-info-movie"></div>
          <div class="info-edit-delete">
            <div class="info" onclick="modalInfoMovie(${movie.id})">
              <img src="./assets/svg/info.svg" alt="info" class="info-icon">
            </div>
            <div class="edit" onclick="modalEditMovie(${movie.id})">
              <img src="./assets/svg/edit.svg" alt="edit" class="edit-icon">
            </div>
            <div class="delete" onclick="modalDeleteMovie(${movie.id})">
              <img src="./assets/svg/delete.svg" alt="delete" class="delete-icon">
            </div>
          </div>
          <div class="movie-info">
            <div class="categories">
              ${viewCategories}
            </div>
            <p class="director">${movie.director}</p>
            <div class="year-rating">
              <p class="year">${movie.year}</p>
              <div class="rating">
                ${rating}
                <span>${movie.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    const domMovie = document.getElementById(movieId)
    domMovie.style.backgroundImage = `url("${movie.img}")`

    const printDeleteMovie = document.getElementById(deleteMovieId)
    printDeleteMovie.innerHTML = `
      <div class="delete-text">
        <p>Do you want to remove <span class="title-delete">${movie.title}</span> from your list?</p>
        <p>This action cannot be undone.</p>
      </div>
      <div class="delete-buttons">
        <button class="delete-movie" onclick="deleteMovie(${movie.id})">Delete</button>
        <button class="cancel-delete" onclick="cancelModalDelete(${movie.id})">Cancel</button>
      </div>
    `

    const printEditMovie = document.getElementById(editMovieId)
    printEditMovie.innerHTML = `
      <div class="edit-text">
        <input type="text" id="edit-title-${movie.id}" value="${movie.title}">
        <input type="text" id="edit-category-${movie.id}" value="${movie.category}">
        <input type="text" id="edit-director-${movie.id}" value="${movie.director}">
        <input type="text" id="edit-year-${movie.id}" value="${movie.year}">
        <input type="text" id="edit-time-${movie.id}" value="${movie.time}">
        <input type="text" id="edit-plot-${movie.id}" value="${movie.plot}">
        <input type="text" id="edit-cast-${movie.id}" value="${movie.cast}">
        <input type="text" id="edit-rating-${movie.id}" value="${movie.rating}">
        <input type="text" id="edit-comment-${movie.id}" value="${movie.comment}">
        <input type="text" id="edit-img-${movie.id}" value="${movie.img}">
      </div>
      <div class="edit-buttons">
        <button class="edit-movie" onclick="editMovie(${movie.id})">Submit</button>
        <button class="cancel-edit" onclick="cancelModalEdit(${movie.id})">Cancel</button>
      </div>
    `

    const printInfoMovie = document.getElementById(infoMovieId)
    printInfoMovie.innerHTML = `
          <div class="info-text">
            <h2>${movie.title}</h2>
            <hr>
            <hr>
            <p class="info-time">Time:<br>${movie.time}</p>
            <hr>
            <p class="info-plot">Plot:<br>${movie.plot}</p>
            <hr>
            <p class="info-time">Cast:<br>${movie.cast}</p>
            <hr>
            <p>Rating:</p>
            <div class="rating">
              ${rating}
              <span>${movie.rating}</span>
            </div>
            <hr>
            <p class="info-comment">Comment:<br>${movie.comment}</p>
          </div>
          <div class="info-button">
            <button class="return" onclick="cancelModalInfo(${movie.id})">Return</button>
          </div>
    `
  }
}

