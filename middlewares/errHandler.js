module.exports = (err, req, res, next) => {
  switch (err.code) {
    case 400:
      res.status(400).json({message: err.message})
      break;
    case 401:
      res.status(401).json({message: err.message})
      break;
    case 402:
      res.status(402).json({message: err.message})
      break;
    case 404:
      res.status(404).json({message: err.message})
      break;
    default:
      res.status(500).json({message: err.message})
      break;
  }
}