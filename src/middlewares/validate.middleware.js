const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const messages = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ message: messages });
    }
    
    req.body = value;
    next();
  };
};

module.exports = validate;
