# Calorie app frontend

This is the frontend app for the Calorie Tracking app. It has been built using React.js, and makes use of a few other libraries, namely:
- `date-fns` for date formatting
- `Axios` for making requests
- `Semantic-ui React` for component library

## Requirements
I built this project using Node v15.14
## How to get started
- `npm i` to install dependencies
- `npm start` to start the server
- Navigate to `/` to view the user page
- Navigate to `/admin` to view the admin dashboard
Note: the `auth token` and `user_id` used to authenticate and fetch data has been hardcoded in `utils.js` and `user.js`

## What I would do next
- Implement auth fully
- Add pagination to tables
- Improve styling