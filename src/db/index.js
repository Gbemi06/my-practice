import { Sequelize } from "sequelize";

const { PGPORT, PGUSER, PGDATABASE, PGHOST, PGPASSWORD, NODE_ENV } =
  process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
  ...(NODE_ENV === "production" && {
    dialectOptions: {
      ssl: {
        required: true,
        rejectUnAuthorized: false,
      },
    },
  }),
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Authentication successful");
    await sequelize.sync({ alter: true });
    console.log("connection successful");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
