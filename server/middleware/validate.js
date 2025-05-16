function validateBoard(req, res, next) {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }
    next();
  }
  
  function validateCard(req, res, next) {
    const { message, gifUrl } = req.body;
    if (!message || !gifUrl) {
      return res.status(400).json({ error: 'Message and gifUrl are required' });
    }
    next();
  }
  
  module.exports = { validateBoard, validateCard };