const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

function list() {
  return knex("movies").select("*")
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first()
}

function isShowing() {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing" : true })
    .groupBy("movies.movie_id")
}

function moviesTheaters(movie_id) {
  return knex("movies_theaters")
  .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
  .select("theaters.*")
  .where({ "movies_theaters.movie_id": movie_id})
}

const criticProperties = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at"
})

function readReviews(movie_id) {
  return knex("reviews")
  .join("critics", "critics.critic_id", "reviews.critic_id")
  .select("reviews.*", "critics.*")
  .where({ "reviews.movie_id": movie_id })
  .then((reviews) => {
    return reviews.map((review)=> criticProperties(review))
  })
}

module.exports = {
  list,
  read,
  isShowing,
  moviesTheaters,
  readReviews
}