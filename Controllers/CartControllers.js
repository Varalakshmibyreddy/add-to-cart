
const login = require('../models/Cart')
const jwt = require('jsonwebtoken')
const vendorLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretkey, { expiresIn: "1h" })

        const vendorId = vendor._id;

        res.status(200).json({ success: "Login successful", token, vendorId })
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}
module.exports = {
    vendorLogin
}