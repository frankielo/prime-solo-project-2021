
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"user_role" varchar(255) NOT NULL DEFAULT 'regular',
	"user_image" varchar(1000)
);


CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	"post_title" varchar(255) NOT NULL,
	"post_author" varchar(255),
	"post_date" DATE NOT NULL DEFAULT NOW(),
	"post_image_url" varchar(1000),
	"post_image_name" varchar(255),
	"post_content" varchar(1000) NOT NULL,
	"post_status" varchar(255) NOT NULL DEFAULT 'draft',
	"post_userid" bigint NOT NULL,
	FOREIGN KEY ("post_author") REFERENCES "user"(username) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ("post_userid") REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
)


CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	"cat_title" varchar(255) NOT NULL UNIQUE
)

CREATE TABLE categories_posts (
	id SERIAL PRIMARY KEY,
	"post_id"  bigint NOT NULL,
	"category_id"  bigint NOT NULL,
	FOREIGN KEY ("post_id") REFERENCES "posts"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ("category_id") REFERENCES "categories"(id) ON DELETE CASCADE ON UPDATE CASCADE
	)


