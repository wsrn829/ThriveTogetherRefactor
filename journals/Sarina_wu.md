## 06/28/2023

Set up Docker and pgAdmin in preparation for the database creation.

## 06/29/2023

Added and migrated the following tables: 004_user_tags table, 005_messages table, 006_peer_connections table.
They all successfully showed up in pgAdmin.

Also created my Sarina_wu.md journal file.

## 07/10/2023

Added a "preferences" column to "users" table because it will be needed for the matching feature.

## 07/14/2023

Pair-worked with Chen today. Created the 009_peer_connections_update, 010_peer_connection_update, and 011_peer_table migration files.

The newly-created "peer" table will primarily make my PeerList.js easier to write especially when using the map() function to go through "peer" table. A crucial step!

## 07/17/2023

Created "create_connection" backend endpoint, which will create new rows in the "peer_connections" table, one of the most important endpoint of my part (I got three in total: create_connection, get_peers, and create_tag)!

Created a "get_users" backend endpoint (including get_users queries, get_users routers, etc), which will show all current users and got it functioning in FastAPI.

## 07/18/2023

Completed "get_peers" backend endpoint (get_peers queries, routers, main, etc), which is another important backend endpoint of mine!

Removed the "NOT NULL" constraints of the peer_connections table columns "sender_name" and "recipient_name" because it was throwing an error in Tanner's Docker.

## 07/19/2023

Created a PeerForm.js to add new rows to the "peer_connections" table. Later, pair-worked with Tanner and converted the PeerForm.js to a PeerButton.js, and added the "Add Peer" button on his matching page, so that he will pass the user data to my PeerButton, which will be added to the corresponding table in the database.

I also completed the PeerList.js, which will show all the peers on a separate page.

OMG. Today is a fruitful day. I completed both of my frontend JS files! So happy!

## 07/20/2023

The PeerList.js was throwing a console error, so worked with Tanner, SEIRS (Donald and Tracey), and the Instructor (Paul) to fix that.

Also worked with Tanner and was able to pass the current logged-in user's data to the PeerList.js, which was great!

Fixed Flake8 Issues (Ran flake8 command in the terminal to check and got no error remaining).

## 07/21/2023

Day-off today. Completed the "Create a Tag" backend endpoint (including queries, routers, etc), which enables creating new rows in the "tags" table in the database using FastAPI (we will be able to see the newly-created tags using "SELECT \* FROM tags;" statement in pgAdmin). This is the last one of my three main backend endpoints!

## 07/23/2023

Today is Sunday. Created "Peers Unit Test" to make sure the "get_peers" backend endpoint returns data correctly. Tested it out in the FastAPI terminal in Docker by running the "python -m pytest test" command and no failure showed up, which was great! This is another milestone!

## 07/25/2023

Optimized the look of my Peers page by changing "peer name" to "username" in PeerList.js. and deleting several other unnecessary columns.

Co-worked with Amanda and finally fixed the PeerList.js console error completely, by adding a new React useState hook (variable called peerDataLoaded) and adding an "if" statement in the JS file. OMG. So happy!

## 07/26/2023

Pair-worked with Clarisse and added data models (schemas) to ReadMe, referring to both pgAdmin and our migrations files. Four columns were included: "field", "type", "optional?", and "unique?".

## 07/27/2023

Had our project presented to the instructor (Zach) today. Made changes and fixed all bugs according to his feedback (with protected endpoints being a crucial part among others), which was awesome!! A huge relief.

---

## 03/07/2024

I plan to deploy and refactor this app and below is what I did today.

- Deployed frontend on Netlify.
- Set up SQLAlchemy and Alembic.
- Refactored database schema by changing names, adding ForeignKeys and relationships.
- Prepared for deploying backend on Heroku by setting up deployment environment and changing file structure.

### SQLAlchemy and FastAPI's Pydantic work well together to build robust and efficient APIs.

- SQLAlchemy: SQLAlchemy is a SQL toolkit and Object-Relational Mapping (ORM) system for Python. It provides a full suite of well-known enterprise-level persistence patterns, designed for efficient and high-performing database access.

- Pydantic: Pydantic is a data validation library that uses Python type annotations to validate that data structures (like JSON) match the expected format. It's integrated with FastAPI to provide data validation, serialization, and documentation for your API endpoints.

### Example

- We define a SQLAlchemy model User and a Pydantic model UserBase.
- When we create a new user in the create_user route, FastAPI uses Pydantic to validate the request data, and SQLAlchemy to save it to the database.

However, it's important to note that Base.metadata.create_all(engine) will only create tables that don't already exist. If a table already exists in your database with the same name as one of your models, create_all will not modify it. If you need to modify an existing table (for example, to add a new column), you'll need to use a database migration tool like Alembic.

## 03/08/2024

Fixed all backend code based on altered table schemas.

- The class names for Pydantic models do not need to match the class names for SQLAlchemy models. Pydantic and SQLAlchemy serve different purposes. SQLAlchemy is an ORM for interacting with your database, so its models represent tables in the database. Pydantic, however, is a data validation library, so its models are used to validate the shape and content of the data.

- But the field names in the Pydantic models should correspond to the column names in your SQLAlchemy models. This is because Pydantic models are often used to parse and validate HTTP request data before it's used to create or update SQLAlchemy model instances. If the field names didn't match, you wouldn't be able to directly use the validated data from the Pydantic model to interact with the SQLAlchemy model.

## 03/09/2024

1. Rewrote PeerRequestList.js.

2. Updated App.js (like routes).

3. Updated styling, including adding Mobile.css.

4. Backend is deployed on Heroku after lots of troubleshooting.

## 03/10/2024

1. Tried to replace original authentication with more popular SSO. I tried to use a custom one, but later decided to implement Auth0. Will continue trying.

2. Heroku was somehow down tonight.

Single Sign-On (SSO) authentication can be complex due to the various protocols and security considerations involved. However, there are several libraries and services that can simplify the process. Here are a few options:

- Auth0: Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications. It supports SSO and offers a generous free tier.

- Okta: Okta is another service that provides SSO and user management. It has SDKs for various languages and frameworks.

- Firebase Authentication: Firebase Authentication supports SSO and integrates well with other Firebase services. It's a good option if you're already using Firebase for your application.

- Passport.js: If you're working with Node.js, Passport.js is a popular middleware that can be used to implement SSO. It supports a wide range of strategies, including OAuth, OpenID, and SAML.

- Spring Security: For Java applications, Spring Security provides comprehensive security services, including SSO.

Implementing SSO involves changes on both the frontend (to handle the SSO process and store the user's token) and the backend (to verify the token and secure endpoints). Make sure to follow the guides closely and test thoroughly to ensure your implementation is secure.

## 03/11/2024

- Docker containers are finally up and running again.  

- Debugging has focused on the fastapi container and database config and connection.

- Used alembic and SQLAlchemy for the first time.

## 03/12/2024

- Read Authentication documentation today. Sometimes, I really miss my cohort mates. Wish it was a little bit longer.

## 03/13/2024

- Based on my one-on-one with instructors before graduation, CI/CD and Redux are absolute priorities for job search in industry but auth is not. I need a bit more motivation to do stuff especially when things are not super straightforward.

## 03/14/2024

- Still need to do it because all our endpoints are protected. I've already redeployed the backend on Heroku and the frontend on Netlify, and neither is throwing any error, nor is Docker. But I cannot test or debug the full functionality without login. It wasn't working in December, but it could be due to deployment issues. The original deployment stopped working after three months, which is why we have to redeploy it. But I'm not sure about the authentication. So I'll probably try that first.

- I need this project on my resume because it's my most complex project so far, and our team built it from scratch without following any tutorials. (We even voted for our project ideas, and this one was the 'winner'.) 

- The only good thing so far is I can deploy projects real quick now. Can't believe I spent months last year lol.

- I attended Sam's group's standups last year, where I learned that Sam deployed their project on Digital Ocean under someone else's guidance (before that, Sam, Anthoney, Diana, and I had tried for about six hours and it didn't work), Sam, Anthoney, and I worked on Redux refactor, and Carmen and Jahaziel were researching on Authentication (I just messaged Carmen actually). And lastly, I first learned SQLAlchemy and Alembic from Amanda (she is really good at the backend part, debugging, project/feature ideas, and also naming stuff). Tanner is good at everything, and he really enjoys styling and CSS. Chen was the only CS major graduate in class (probably?), and worked as a software engineer at a bank for three years before, focusing on online banking using Java (he came to our class primarily to practice his spoken English as well as to learn the latest technology in the States...and now he is pursuing his CS master at Georgia Tech. He said I could do that as well lol).

- Relocated to a neighboring city last month, and found many of my neighbors are software engineers. One of them mentioned that the current job market is a result of overhiring during Covid and high interest rates right now. He thinks AI is a minor factor because they are not smart enough. Should I still focus on AI projects then? (Am I too goal-oriented? Is it good?)
