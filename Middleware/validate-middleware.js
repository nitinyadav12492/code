const validate = (schema) => async (req, res, next) => {
  try{
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } 
  
  
  catch (err) {
    statusCode = 400;
    const message = "fill the important fields";
    const extraDetails = err.issues[0].message;
    // console.log(message);
   const error ={
    statusCode,
    message,
    extraDetails
   };
   next(error);
  }
};

export default validate;