const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user);
    const adminRole = req.user?.isAdmin;

    if (!adminRole) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default adminMiddleware;