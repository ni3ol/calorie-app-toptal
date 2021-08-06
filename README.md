# Calorie Tracking app

This is a calorie tracking app created as part of my Toptal Interview process

- Requirements [here](https://drive.google.com/file/d/1djG2tiDcugAw1_Q29ePqa3F_YyB-7CaE/view)
- Video demo [here](https://www.loom.com/share/f0f54039e39d46dea898ad4cb1d615c4)

## Calorie app- backend

The backend has been built using Ruby on Rails and Postgres
### How to get started
- `bundle install`
- `rake db:create` and `rake:db:migrate` to create and migrate the db (you'll also need to create the database using PSQL)
- `rake db:seed` to seed the db
- `rails s` to start the server
- Navigate to `/` to view the user page
- Navigate to `/admin` to view the admin dashboard
Note: each user's `auth token` has been hardcoded for the purpose of this demo

## Calorie app frontend

The frontend has been built using React.js, and makes use of a few other libraries, namely:
- `date-fns` for date formatting
- `Axios` for making requests
- `Semantic-ui React` for component library

### Requirements
I built this project using Node v15.14

### How to get started
- `npm i` to install dependencies
- `npm start` to start the server
- Navigate to `/` to view the user page
- Navigate to `/admin` to view the admin dashboard
Note: the `auth token` and `user_id` used to authenticate and fetch data has been hardcoded in `utils.js` and `user.js`

### What I would do next
- Implement auth fully
- Add pagination to tables
- Improve styling