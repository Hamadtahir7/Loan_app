const validateRequest = (schema ,source='body') => {
 const datavalidate=
    source === 'query' ? req.query :
    source === 'params' ? req.params :
    req.body;

    const { error, value } = schema.validate(datavalidate);
    if (error) {
        return next({status: 400, message: error.details[0].message});
    }
   if (source === 'query') req.query = value;
  else if (source === 'params') req.params = value;
  else req.body = value;

  next();
};

module.exports = validateRequest;