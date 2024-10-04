Description : 
1. framework used : node js express js
2. authentication with jwt
3. postman collection for testing added in this repository

Following Steps : 
1. clone code from repository
2. git checkout master
3. create database in postgresql
4. run npm install
5. create .env file
6. paste in .env file : 
```
PORT=your_port default 3000

DB_HOST=localhost
DB_PORT=set_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjY2MzM2MDksImV4cCI6MTc1ODE2OTYwOSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Z3xmwBtbThEAJIhZSMis85XU0YYmfWAvub9nrd6x4jU
```

7. run : npm run dev
