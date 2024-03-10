# Thrive Together

Thrive Together is your go-to app that creates a safe space for people experiencing mental health concerns to connect, find support, and mentor each other. This platform allows users to message each other safely and securely after connecting based on shared experiences.

Thrive Together - connecting like-minded folks.


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
