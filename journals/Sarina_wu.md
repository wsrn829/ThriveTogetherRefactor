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
