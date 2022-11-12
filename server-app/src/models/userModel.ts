import { DataTypes } from "sequelize";
import db from "../config/database";

const Users = db.define(
  "users",
  {
    user: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true }
);

(async () => {
  await db.sync();
})();

export default Users;
