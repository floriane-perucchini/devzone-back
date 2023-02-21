async function errorsHandler(error, request, response) {
  // Handle Zod Errors
  if (error.details) return response.json(error.details[0].message);

  // Handle General Errors
  response.status(500).json(error.message);
}

export default errorsHandler;
