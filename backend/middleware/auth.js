import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
 console.log("Authorization:", req.headers.authorization);
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "unauthorised" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "unauthorised" });
  }
 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
} catch (err) {
    return res.status(401).json({
        error: "Invalid token"
    });
}

};
export default auth;