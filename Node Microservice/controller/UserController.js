const con = require("../Database/conn");

const UserController = {
  AllTravelPlans: async (req, res) => {
    try {
      const connection = await con.getConnection();

      const query = `select * from travel_plans`;

      const [rows, fields] = await connection.execute(query);

      connection.release();

      if (rows && rows.length > 0) {
        return res.status(200).json(rows);
      } else {
        return res.status(200).json([]); // or any default value if no rows are found
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "error", error: err.message });
    }
  },

  
  getUserDetails: async (req, res) => {
    try {
      const userId = req.params.userId;
      const connection = await con.getConnection();

      const query = `SELECT * FROM users WHERE user_id = ${userId}`;

      const [rows, fields] = await connection.execute(query);

      connection.release();

      if (rows && rows.length > 0) {
        return res.status(200).json(rows[0]);
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "error", error: err.message });
    }
  },
  
};

module.exports = UserController;
