# Mobile app for property listings

### Development notes
* WebView needs hosted app
* Used `ngrok` to get address for our local app, but to support web sockets we need a paid plan.
* To connect to our local app we need to use (10.0.2.2) for android, for ios we can use localhost
* Update the frontend server to listen to requests coming from the mentioned addresses.
* Updated the vite config file to listen to requests coming from all ips.
* Still the metro server of Expo kept crashing (on android).
* The fault was the android simulator, somehow the Pixel 7 pro simulator was the cause of the issue. Downloaded a new simulator and the frontend started to load on the mobile app.
* Still, the calls to backend were getting blocked.
* Updated the axios base address in the frontend project to use 'ip address' instead of 'localhost', but still the requests didn't go through.
* completely replaced every mention of 'localhost' with machine's 'ip address' in both frontend and backend servers, still no effect.
* Updated android's setting to allow http requests to go through...
            `"usesCleartextTraffic": true`
still no effect
* Checked the backend console and saw that the MongoDB connection had been terminated and was causing all this trouble.
* Restarted backend server and after connection to MongoDB was established the calls to backend started working as well.
