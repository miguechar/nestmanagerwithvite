install all dependencies via npm listed onder package.json

Under src/Config.jsx line 24-25 enter IPv4 address and 8080 as port (the only one that seems to work for me)
This will the port that the backend server will run off of. 

In vite.config.js change line 11 to IPv4 and maintain the same port (the port on client side will not make a difference in the rest of code)

To run client side server run

```
npm run dev
```