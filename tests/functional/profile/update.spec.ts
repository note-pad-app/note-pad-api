import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";

test.group("user update", (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction());

  test("user updating without any error", async ({ client }) => {
    let user = await UserFactory.create()

    let data = {
      username: 'sis',
      fullname: 'ssss',
      avatar_path: "/sljdlkdlkdjlkjd.com"
    }

    const response = await client
      .put(`api/profile/update`)
      .json(data)
      .loginAs(user)

    response.assertBodyContains({
      id: Number,
      fullname: data.fullname,
      avatarPath: data.avatar_path,
      username: data.username,
    })

    response.assertStatus(200)

  });

  test("user updating with invalid data", async ({ client }) => {
    let user = await UserFactory.create()

    const response = await client
      .put(`api/profile/update`)
      .json({
        fullname: false,
        username: false,
        avatar_path: 4343
      })
      .loginAs(user)

    response.assertBodyContains({
      errors: [
        {
          message: 'The fullname field must be a string',
          rule: 'string',
          field: 'fullname'
        },
        {
          message: 'The avatar_path field must be a string',
          rule: 'string',
          field: 'avatar_path'
        },
        {
          message: 'The username field must be a string',
          rule: 'string',
          field: 'username'
        }
      ]
    })
  });
});