# Migration `20200827085338-psql`

This migration has been generated by letsandeepio at 8/27/2020, 8:53:38 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Link" (
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" text  NOT NULL ,
"url" text  NOT NULL ,
"postedById" integer   ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."User" (
"id" SERIAL,
"name" text  NOT NULL ,
"email" text  NOT NULL ,
"password" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Vote" (
"id" SERIAL,
"linkId" integer  NOT NULL ,
"userId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Vote.linkId_userId" ON "public"."Vote"("linkId","userId")

ALTER TABLE "public"."Link" ADD FOREIGN KEY ("postedById")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("linkId")REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200801124047-add-vote-model..20200827085338-psql
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 // 1
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = "postgresql"
+  url = "***"
 }
 // 2
 generator client {
```


