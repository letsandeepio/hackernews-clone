DROP TABLE IF EXISTS "public"."Link" CASCADE;

DROP TABLE IF EXISTS "public"."User" CASCADE;

DROP TABLE IF EXISTS "public"."Vote" CASCADE;

CREATE TABLE "Link"(
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" text NOT NULL,
"url" text  NOT NULL,
"postedById" integer,
PRIMARY KEY ("id"));

CREATE TABLE "User"(
"id" SERIAL,
"name" text  NOT NULL,
"email" text  NOT NULL,
"password" text  NOT NULL,
PRIMARY KEY ("id"));

CREATE TABLE "Vote"(
"id" SERIAL,
"linkId" integer  NOT NULL,
"userId" integer  NOT NULL,
PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email");

CREATE UNIQUE INDEX "Vote.linkId_userId" ON "public"."Vote"("linkId","userId");

ALTER TABLE "public"."Link" ADD FOREIGN KEY ("postedById")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("linkId")REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
