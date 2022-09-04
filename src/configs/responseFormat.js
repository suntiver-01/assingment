
module.exports = (req, res, next) => {
  res.success = ({
    data = "",
    statusCode = 200,
    code = "0000",
    message = "success",
    description = "success"
  }) => {
    const response = {
      status: {
        code,
        message,
        description,
      },
      data
    };

    res.status(statusCode || 200).send(response);
  };

  res.error = ({
    message = "failed",
    description = "failed",
    statusCode = 500,
    code = "0001",
  }) => {
    const errorBody = {
      status: {
        code,
        message ,
        description ,
      }
    };
    console.log(errorBody);

    res.status(statusCode || 500).send(errorBody);
    console.log(errorBody);
  };
  next();
};
