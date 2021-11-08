# MINDSET - BACKEND.

**Version 1.0.0**

For this week (8th) we have to work on the backend for the mindset project 

As a group we had to work with branches to solve the given tasks.

The project has 3 main areas to focus in, these are:

 - Psychologist

 - Admins

 - Users/Applicants

---

## DEPENDENCIES INCLUDED.

First of all we need to download the last version of Node.js on [ClickHere](https://nodejs.org/es/download/).

In order to set up a server to work we made use of:

$ npm init

$ npm install express --save

$ npm install --save-dev nodemon

---

## STEPS TO BUILD AND RUN THE SERVER.

$ const express = require ('express');
$ const app= express();
$ const cors = require ('cors');
$ app.use(cors());
$ app.use(express.json());
$ app.use(express.static('public'));
$ const PORT = process.env.PORT || 4000;
$ app.listen(PORT);

---

## GROUPS.

- Paloma and Sabrina were assigned to the user/applicant area.

- Martin and Vicenzo were assigned to the admin area.

- Juan y Andres were assigned to the psychologist area.

---

## Contributors.

- Vicenzo Mantilla <vicenzomantilla94@gmail.com>

- Paloma Quiroz <palomaxquiroz@gmail.com>

- Martin Barea <martin.barea94@gmail.com>

- Sabrina Pereira <pereira.tsabrina@gmail.com>

- Juan Andres Menchaca <juanmenchaca7698@gmail.com>

- Andres Pienizzio <andrespienizzio@gmail.com>

---

## License & Copyright.

© Mindset, Radium Rocket Course.