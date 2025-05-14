import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    console.log("Cookies:", req.cookies); // Debugging
    console.log("Body before modification:", req.body); // Debugging

    const token = req.cookies.token;

    if (!token) {
        return res.json({ success: false, message: "Unauthorized access. Please login again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure req.body is not undefined
        req.body = req.body || {};

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: "Unauthorized access. Please login again" });
        }

        console.log("Body after modification:", req.body); // Debugging
        next();

    } catch (error) {
        console.error("Error in userAuth middleware:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;
