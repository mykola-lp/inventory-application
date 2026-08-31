# Project: Inventory Application

## Introduction

Alright! Let's flex our skills a little! The section was humongous, and you learned a *lot* of things. The only way to make it stick is to practice!

For this project you are going to create an Inventory management app for an imaginary store. It's up to you what kind of business this is – you could be managing groceries, car parts, baby-toys, musical-instruments, ponies or anything!

Your Inventory app should have categories and items, so when the user goes to the home-page they can choose a category to view, and then get a list of every item in that category. You should include all of the CRUD methods for both items and categories, so anybody that's visiting the site can Create, Read, Update or Delete any Item or Category.

## Built With

- Docker
- Node.js
- Express
- EJS
- PostgreSQL
- node-postgres (pg)

## Database Setup (PostgreSQL via Docker)

This project uses PostgreSQL running in Docker, no global installation required.

### Prerequisites
- Docker and Docker Compose installed on your machine.

**1. Create your `.env` file**

Copy the example below into a new `.env` file in the project root:

```env
POSTGRES_USER=inventory_user
POSTGRES_PASSWORD=inventory_pass
POSTGRES_DB=inventory_app

DATABASE_URL=postgresql://inventory_user:inventory_pass@localhost:5432/inventory_app
```

**2. Start the database**

```bash
docker compose up -d
```

Check that the container is healthy:

```bash
docker compose ps
```

**3. Connect to the database via psql (inside the container)**

```bash
docker compose exec postgres psql -U inventory_user -d inventory_app
```

OR **quick connection test:**

```bash
docker compose exec postgres psql -U inventory_user -d inventory_app -c "SELECT 1;"
```

**4. Stop the database**

```bash
docker compose down
```

Data persists in the `./pgdata` folder (bind mount) between restarts. To wipe all data, stop the container and delete `./pgdata`.

## Getting Started

Install dependencies (if any):

```bash
npm install
```

Start the server:

```bash
node app.js
```

Open the app in your browser:

```
http://localhost:3000
```

## Database Schema

The store sells horses, grouped by breed/category.

### `categories`

| Field | Type | Description |
|---|---|---|
| `id` | `INTEGER` (identity) | Primary key |
| `name` | `VARCHAR(255)` | Breed/group name (e.g. "Arabian", "Draft") |
| `description` | `TEXT` | Group description (optional) |

### `items` (horses)

| Field | Type | Description |
|---|---|---|
| `id` | `INTEGER` (identity) | Primary key |
| `name` | `VARCHAR(255)` | Horse's name |
| `category_id` | `INTEGER` (foreign key → `categories.id`) | Link to breed/category |
| `age` | `INTEGER` | Age |
| `sex` | `VARCHAR(20)` | Sex (mare/stallion/gelding) |
| `height_hands` | `NUMERIC(4,1)` | Height in hands |
| `color` | `VARCHAR(50)` | Coat color |
| `price` | `NUMERIC(10,2)` | Price |
| `description` | `TEXT` | Description/temperament |

### Relations

One-to-many: one `category` has many `items`. Each horse must belong to exactly one category; one category can contain many horses.

```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  age INTEGER,
  sex VARCHAR(20),
  height_hands NUMERIC(4,1),
  color VARCHAR(50),
  price NUMERIC(10,2),
  description TEXT
);
```

## Assignment

1. Set up an Express project and a new PostgreSQL database.

2. Before you begin, take a moment to write down all of the database tables and its fields you'll need, as well as the relations between them. For example:
   * In a game management app, there can be a game, genre, and developer entity. A game can have one or multiple developers and genres. Similarly a developer can develop multiple games.
   * In a pokemon management app, there can be a pokemon, trainer and a type entity. Each pokemon must be contained in a type. While a trainer can have multiple pokemons.

      Any sufficient inventory app will have relations and constraints against its entities. Figure out these database particulars for your inventory app.

3. Set up the routes and controllers you're going to need.

4. Create all of the 'READ' views (i.e. view category, and view item).

5. Create all the forms and build out the controllers you need for the create and update actions.

6. Figure out the delete functionality. What happens if you try to delete a category with items in it? Should it delete all the items as well? Should it just remove the category from the items? Or something else? This specific behavior will depend on your app's requirements.

7. Once you're confident with your project, add dummy data via a script to your local database. Do this again when you deploy.

8. Deploy it and show off what you've done!

### Extra credit

1. Make it pretty!
2. We will learn about creating users with secure passwords in a later lesson, but for now we don't want just *anyone* to be able to delete and edit items in our inventory! Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action.
