import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",    
    password: "Einstein@1905@", 
    database: "schoolDB",
  });
  return connection;
}
