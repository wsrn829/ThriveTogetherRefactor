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

- Once I start applying, I start getting either online coding assessments/interviews, and no offer for full-time positions after several rounds of screening. This was the case last year. If my projects etc are not strong enough, getting responses (which is already pretty hard in this market) is not exciting anymore (although I could still practice my interview skills, considering the time spent on preparing for a specific position, I'm not sure). But I'm still applying. Still haven't considered contract jobs yet. I'd need to put back this project on my resume anyway.

## 03/16/2024

- Finally fixed the landing page buttons, which sometimes worked and sometime didn't on my end. Also worked on styling a little bit.

## 03/17/2024

- Tried to figure out if Galvanize version of auth was still working. I'd first try using that.

## 03/18/2024

- Debugged frontend, API, even disabled auth temporarily and still couldn't create an account in the database. Turned out my database was not connected/set up properly...I should have tested that first. Oh I miss Django so much. Built-in ORM was so easy. Will resume after I finish my coding assessment tomorrow.

## 03/19/2024

- Just now learning that the root endpoint could work even without connecting to any database after deployment. Also means additional tests are needed to check database connection.

## 03/20/2024

- AI cannot even help me debug database connection, making me feel both annoyed and safe.

- Every group has their unique Mod 3 final project, but varying in technical complexity. I didn't realize it until during an interview, I was asked why we chose this project and I said we actually had some other options, and the interviewer said obviously this one has more complex features and probably includes more "technical milestones". Maybe this is one of the reasons why I was able to get like 10+ assessments/interviews last year(?). I barely had time to work on projects because of those coding assessments/interviews coming one after another. Really proud of my teammates though.

- According to the instructor, the most complex feature of this app is peer connection/request, followed by the messaging feature, idk if filtering users based on their tags is included in peer connection/request. I was in charge of the peer part and consequently had to work closely with most of my teammates. For graduation, we only needed to finish MVP, but for jobs, I definitely needed more. Our group was the only group (I guess) who implemented Redux even before graduation. I was so lucky.

## 03/21/2024

- SQLAlchemy and alembic not compatible with main backend queries. I don't want to make major changes in backend code, so deleted SQLAlchemy and alembic, and created migrations files.

- Did extensive debugging on main.py and init.py in migrations.

## 03/22/2024

- Fixed Docker container errors.

- Created local postgres database. Too sleepy to work on Heroku database. Will save for tomorrow.

- Actually getting "too many connections" error again. Good thing is: this is the only remaining issue right now. Bad thing is: I already spent two days on this error.

## 03/23/2024

- Finally fixed the "too many connections" error by upgrading my Heroku database plan (from 20 connections to 120 connections, with 60 current connections).

- Successfully connected Heroku Postgres database with my deployed app.

- Ran migration files and successfully created all tables in the database.

- Next step is to check if I could add data into the tables as well as if my authentication would work.

## 03/24/2024

- As an "engineer", first time thinking about how to reduce cost, which I should have been thinking about all the time. My Heroku database plan is up to $50/month to get my apps working right now. Actually I was able to create a postgres database using AWS 12-month free database plan last night (thinking it'd be nice to both reduce cost and put AWS on my resume), but wasn't able to connect it with my app. But I did get a list of free database plans on different platforms, including AWS, Microsoft Azure, Google Cloud, Firebase, etc, ranging from 3 to 12 months per account.

- Another solution is to optimize my code. Last year, Amanda and I tried to implement Redux refactor before deployment in order to reduce database interactions, but Sam told us there's little change in cost after they had done the same.

- At least I've started thinking about solving "real-world" problems, such as saving money. Much better than when asked about what kind of real-world problems I've faced and how I've solved them, I'd tend to say that actually I never encountered any real-world problem as an engineer...

- I was able to create a new row in the users table in the database after signing in, which means my frontend-backend-database system is at least connected in some way, but I don't think authentication is working properly. Tanner had said that he watched the authentication tutorial video at least eight times, which was of little help (?). My priority rn again becomes understanding what is going on with auth.

## 03/25/2024

- The only function of the signup form is to create new rows in the users table in the database, which is functioning perfectly rn.

- Token generation has nothing to do with the signup process; it is only generated during login.

- Signup is only relevant to authentication in the sense that we require user information generated during the signup process for validation, which is followed by token generation from the backend upon successful verification. Signup is also relevant because typically the webpage redirects to the login page after signup.

- Token generation is the core of "Backend Auth". The backend generates a token containing user information and signs it with a secret key.

- The frontend stores the token securely, usually in browser storage. When accessing protected routes, the frontend sends the token with each request in the Authorization header.

- The backend verifies the token's signature and extracts user information from it. If the token is valid, the request is authenticated; otherwise, it's rejected.

==> The above is the authentication process in plain English. Implement it in code now.
