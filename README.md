# ThriveTogether 

-------

The main purpose of this refactor is to replace the backend with Django and add my custom authentication. 

I also want to learn how to implement the messaging feature and the peer request feature. I already know how to implement posting, liking, commenting, replying, and following/followers, though some of these need more practice.

Thanks for your genuine appreciation of my coding skills and personality. Considering I do need a bit more real-world business awareness, I plan to find my first retail job somewhere first. :)

It's the first time I've felt so confident showing what I know. Yes, the biggest benefit of doing many projects is that I could finally appreciate how smart and sharp those technical questions were, so that you wouldn't feel you were wasting your time interviewing me. :P

-------

ThriveTogether is a comprehensive, full-stack mental health peer support application, meticulously developed by our team from inception to implementation using React, Redux Toolkit, FastAPI, OAuth2, JWT, PostgreSQL, unit testing, and CI/CD. 

The journey began with brainstorming and voting on project ideas, followed by wireframing to design the UI/UX. The entire process was carried out with minimal mentorship, demonstrating our team's self-reliance and technical acumen.

In this project, I accomplished the following:

- Rebuilt the Postgres database and refined the database schemas by updating column names and adding Foreign Keys.

- Set up CI/CD pipelines, deployed the project on Heroku (backend) and Netlify (frontend), and connected it to a Postgresql database running on Heroku.

- Implemented Redux Toolkit and Redux Thunk for efficient central state management and handling of asynchronous operations.

- Implemented OAuth2 with JWT tokens for backend authentication, and React's useContext hook for login, logout, registration, and fetching tokens from the API for frontend authentication.

- Developed peer-adding and peer list functionalities utilizing React on the frontend and FastAPI on the backend.

- Developed comprehensive unit tests to ensure the reliability and stability of the application.

- Revamped the landing page design and applied responsive styling for optimal display on both desktop and mobile devices.

-------------------------------------------------------------------------------

ThriveTogether is your go-to app that creates a safe space for people experiencing mental health concerns to connect, find support, and mentor each other. This platform allows users to message each other safely and securely after connecting based on shared experiences.

ThriveTogether -- connecting like-minded folks.


## Developed by:

- Clarisse Alvarez
- Sarina Wu
- Tanner Jackson
- Liangjian Chen
- Amanda Gifford

## Getting Started

1. Fork this repository.
2. Clone the forked repository onto your local computer and inside of your chosen directory:

```
 git clone <<respository.url.here>>
```

3. Build and run the project using Docker with the following commands:

```
docker volume create postgres-data
docker-compose build
docker-compose up

```

- Note: Check all of the containers in Docker after running the previous commands to ensure that they are all running.

## Design

- [API Design](./docs/APIS.md)
- [Data Models](./docs/DATA_MODEL.md)
- [GHI](./docs/GHI.md)

The whole of the app is easily navigable by the links in the navbars to the top and left sides of the screen.

- Users can sign up for an account, and then login and logout.
- Upon login, the user can view their own profile page as well as other user profile pages.
- The user can update their profile when logged in to their account.
- The user can view a list of tags, add new tags to their profile, as well as delete tags from their profile.
- The user can view people with the same tags and send peer requests.
- The person who receives a peer request can accept or reject it.
- After a peer request is accepted, the user will be added to the peer list page.
- The inbox is available for peers who have connected to message each other back and forth.
