import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie =  (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })

  res.cookie("token", token, {
    // Cookie cannot be accessed by client side js
    httpOnly: true, 
    // Local host uses http and production uses "https", s standing for secure
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  return token;
}