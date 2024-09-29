const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.doctor_token;
  if (!token) return res.status(401).json({ message: "Access denied" });


  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.userId;

    console.log("console from the middleware", req.user);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};


// const verifyTokens = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res
//       .status(401)
//       .json({ error: "User ID is missing in cookies. Please log in." });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//     if (err) {
//       return res.status(403).json({ error: "Invalid token" });
//     }
//     console.log("Decoded Token:", decodedToken);
//     req.userId = decodedToken.userId;
//     next();
//   });
// };

module.exports = verifyToken;
// module.exports = verifyTokens;
