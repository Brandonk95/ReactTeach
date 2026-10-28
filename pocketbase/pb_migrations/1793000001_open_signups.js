/// <reference path="../pb_data/types.d.ts" />

// Opens public sign-up: anyone who can reach the site can create an account.
// To make accounts invite-only again, go to the dashboard: Collections → users
// → API Rules → Create rule, and set it to "Superusers only" (locked).
migrate(
  (app) => {
    const users = app.findCollectionByNameOrId("users");
    users.createRule = "";
    app.save(users);
  },
  (app) => {
    const users = app.findCollectionByNameOrId("users");
    users.createRule = null;
    app.save(users);
  },
);
