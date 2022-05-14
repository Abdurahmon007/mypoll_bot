const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: 5432,
	database: "mypollbot",
	password: "1171020",
});

const pgQuery = async (SQL, ...values) => {
	const client = await pool.connect();
	const data = await client.query(SQL, values);
	client.release();
	return data.rows;
};

module.exports = { pgQuery };
