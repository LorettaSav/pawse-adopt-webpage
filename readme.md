## _Pawse, Adopt By Veronica, Dakshika & Loretta_


Pawse, Adopt is a user-friendly, responsive website app which centralises the communication between those who would like to adopt dogs and those who need to give them up for adoption. It also aims to provide a platform for pet owners to communicate and educate each other through forums, so that anyone, regardless of experience, can have their own pooch to treat right!

- ✨Magic ✨

## Dependencies

- `npm i` for general installation both in client and in project folder
[ react, express, pusher, axios, bootstrap, material UI, pusher-js, markdown-to-jsx, sequelize, react-select, react-router-dom, node.js]
- APIs used : Google Places and Thedogapi.com
- `npx sequelize-cli db:migrate` for database migration and `npx sequelize-cli db:seed:all` for all seed files.
- `npm start` in project folder and `npm run dev` in client

## Database

### Tables 
- USERS [ id, username, password, email, name, surname, location, longitude, latitude, adopter, avatar, date_of_birth]
- PETS [id, user_id, breed_id, name, gender, avatar, location, longitude, latitude,age, vaccination_status, special_needs, diet, passport, neutered, personality, chip, medical_issues]
- USER_PROFILES [id, user_id, bio, reason_to_adopt, reason_to_give, extra_info, occupation]
- BREEDS [ id, breed, height, weight, life_expectancy, temperament, min_weight, max_weight]
- PHOTOS [id, filename, external_id, type]
- MESSAGES [id, senderId, receiverId, content, timestamp]
- Contacts [id, name, email, text]
- QUESTIONS [id, question]
- ANSWERS [id, answer, question_id]

*Associations*
> Users 1:M Pets
> User_profiles 1:M Photos
> Pets 1:M Photos
> Users M:M Pets through Favourites junction table
> Messages M:M Users
> Breeds 1:M Pets
> Questions 1:1 Answers