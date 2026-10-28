/// <reference path="../pb_data/types.d.ts" />

// Accounts are invite-only (created by a superuser in the dashboard), and each
// user's course progress is stored in a "progress" record only they can access.
migrate(
  (app) => {
    const users = app.findCollectionByNameOrId("users");
    users.createRule = null; // no public sign-up
    app.save(users);

    const progress = new Collection({
      type: "base",
      name: "progress",
      listRule: "user = @request.auth.id",
      viewRule: "user = @request.auth.id",
      createRule: '@request.auth.id != "" && @request.body.user = @request.auth.id',
      updateRule: "user = @request.auth.id && (@request.body.user:isset = false || @request.body.user = @request.auth.id)",
      deleteRule: "user = @request.auth.id",
      fields: [
        { name: "user", type: "relation", required: true, collectionId: users.id, cascadeDelete: true, maxSelect: 1 },
        { name: "course", type: "text", required: true, max: 100 },
        { name: "data", type: "json", maxSize: 5 * 1024 * 1024 },
        { name: "created", type: "autodate", onCreate: true, onUpdate: false },
        { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
      ],
      indexes: ["CREATE UNIQUE INDEX idx_progress_user_course ON progress (user, course)"],
    });
    app.save(progress);
  },
  (app) => {
    app.delete(app.findCollectionByNameOrId("progress"));
    const users = app.findCollectionByNameOrId("users");
    users.createRule = "";
    app.save(users);
  },
);
