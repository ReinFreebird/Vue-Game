/**
 * @file URL Query Handlers
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module handlers/queryResults
 */

const queryResults = (model, populate) => async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // Fields exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'populate'];

  // loop removeFields and delete from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create mongoose operators ($gt, $lt, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`,
  );

  // Find resources based on query
  query = model.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalDoc = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Append populate method
  if (populate) {
    query = query.populate(populate);
  }

  if (req.query.populate) {
    query = query.populate(req.query.populate);
  }

  // Executing query
  const results = await query;

  // Pagination object to be included in response
  const pagination = {};

  // Next Logic
  if (endIndex < totalDoc) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  // Previous logic
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.queryResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = queryResults;
