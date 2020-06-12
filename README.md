# React application with Express server

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Then an Express server was added in the `server` directory. The server is proxied via the `proxy` key in `package.json`.

## Using this project

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/philnash/react-express-starter.git
cd react-express-starter
npm install
```

To actually use the Twilio SMS API, you will need to create an .env file in the root directory formatted as such:
```bash
TWILIO_ACCOUNT_SID=YOUR_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_AUTH_TOKEN
TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER
```
@MatthewBullen, I can screenshare the live app if you do not want to set up your own Twilio account/API keys

Run the application (React App and Express Server) with:

```bash
npm run dev
```


The React application will run on port 3000 and the server port 3001.
