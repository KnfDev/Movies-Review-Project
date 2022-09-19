const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req,res) {
  if(req.query.is_showing){
    const data = await service.isShowing()
    res.json({ data })
  }
  const data = await service.list()
  res.json({ data })
}

async function read(req,res) {
  res.json({ data: res.locals.movie })
}

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId)
  if(movie){
    res.locals.movie = movie;
    return next()
  }
  next({
    status: 404,
    message: `Movie cannot be found.`
  })
}

async function readTheaters(req, res) {
  const movieId = req.params.movieId
  const data = await service.moviesTheaters(movieId)
  res.json({ data: data })
}

async function readReviews(req, res) {
  const movieId = req.params.movieId
  const data = await service.readReviews(movieId)
  res.json({ data: data })
}

module.exports = {
  // isShowing: asyncErrorBoundary(isShowing),
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists),read],
  readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
  readReviews: [asyncErrorBoundary(movieExists), readReviews]
}