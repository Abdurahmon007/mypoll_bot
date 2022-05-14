const { Pool } = require("pg");

const pool = new Pool({
	host: "ec2-63-32-248-14.eu-west-1.compute.amazonaws.com",
	user: "usxkygytvdsrqw",
	port: 5432,
	database: "d6jdgph7kh4f1m",
	password: "3f04ea1268154fa14bd04675cb1c17ec6445eb33683f1c1518729370986b351a",
});

const pgQuery = async (SQL, ...values) => {
	const client = await pool.connect();
	const data = await client.query(SQL, values);
	client.release();
	return data.rows;
};

module.exports = { pgQuery };
