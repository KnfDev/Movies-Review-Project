const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const criticProperties = mapProperties({
  // critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  // created_at: "critic.created_at",
  // updated_at: "critic.updated_at"
})

function read(review_id) {
  return knex("reviews")
  .join("critics", "critics.critic_id", "reviews.critic_id")
  .select("reviews.*", "critics.*")
  .where({ "review_id": review_id })
  .first()
  .then(criticProperties)
}

function update(review) {
  return knex("reviews")
  .select("*")
  .where({ review_id: review.review_id})
  .update(review)
  .then(()=> read(review.review_id))
}


function destroy(review_id) {
  return knex("reviews")
  .where({ review_id }).del()
}

module.exports = {
  read,
  update,
  delete: destroy
}