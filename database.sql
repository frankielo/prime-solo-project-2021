CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"user_role" varchar(255) NOT NULL DEFAULT 'regular',
	"user_image" varchar(255),
	"user_status" varchar(255) NOT NULL DEFAULT 'active'
);
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    "post_title" varchar(255) NOT NULL,
    "post_author" varchar(255),
    "post_date" DATE NOT NULL,
    "post_image" TEXT,
    "post_content" varchar(1000) NOT NULL,
    "post_status" varchar(255) NOT NULL DEFAULT 'draft',
    "post_userid" integer REFERENCES "users",
)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    "cat_title" varchar(255) NOT NULL UNIQUE
)
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    "comment_author" varchar(255) NOT NULL,
    "comment_email" varchar(255) NOT NULL,
    "comment_content" varchar(255) NOT NULL,
    "comment_date" DATE NOT NULL,
    "comment_status" varchar(255) NOT NULL DEFAULT 'unapproved',
    "comment_postid" integer REFERENCES "posts" NOT NULL,
    "comment_userid" integer REFERENCES "users"
)
CREATE TABLE categories_posts (
    id SERIAL PRIMARY KEY,
    "post_id" integer REFERENCES "posts" NOT NULL,
    "category_id" integer REFERENCES "categories" NOT NULL,
)

INSERT INTO "users" ("username", "user_email", "user_password", "user_firstname", "user_lastname",
 "user_role", "user_image")
VALUES ('Frankie', 'any@gmail.com', 'mypassword', 'myfirstname', 'mylastname', "admin", NULL)


INSERT INTO "posts" ("post_title", "post_author", "post_date", "post_image", "post_content", "post_status",
"post_userid")
VALUES ('My First Blog', 'Frankie', '2021-15-12', NULL, 'The content of this post', '', 1)

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );