const service = require("./theaters.service")

async function list(req, res, next) {
  data = await service.list()
  res.json({ data: data })
}

module.exports = {
  list
}