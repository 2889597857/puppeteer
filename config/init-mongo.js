// 需要和上面 docker-compose.yml 里的MONGO_INITDB_ROOT_USERNAME和 MONGO_INITDB_ROOT_PASSWORD 对应上
db.auth("root", "admin");

// 需要和上面的 MONGO_INITDB_DATABASE 对应上
db = db.getSiblingDB("my-database");

db.createUser({
  user: "whcss",
  pwd: "whcss520",
  roles: [
    {
     // 赋予这个用户读写 my-databse 数据库的权限
      role: "readWrite",
      db: "my-database",
    },
  ],
});