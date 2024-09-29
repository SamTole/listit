import jwt from 'jsonwebtoken';

// The next parameter is explained in the endpoints (auth.route.js)
export const verifyToken = (req, res, next) => {
  // Need to have middleware to extract the token (in index.js cookieParser)
  const token = req.cookies.token;
  if (!token) {  
    return res.status(401).json({ success: false, message: "Unauthorized; no token provided." });
  }
  try {
    // Need to use secret to decode token just like we used it to create the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized; invalid token." });
    }

    // Adding this userId field to the request which is going to be the userId field in the token
    req.userId = decoded.userId;
    
  } catch (error) {
    console.log("Error in verifyToken: ", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}