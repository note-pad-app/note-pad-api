import { test } from "@japa/runner";
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Users registration', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('register successfully', async ({ client }) => {
    const response = await client.post('api/auth/register')
      .json({
        firstname: "edriss",
        lastname: "aria",
        username: "aria",
        email: "email@gmail.com",
        password: "xxx",
        confirm: "xxx"
      })

    response.assertBodyContains({
      type: 'bearer',
      token: String
    })

  })
})

test("empty body", async ({ client }) => {
  const response = await client
    .post(`api/auth/register`)
    .json({})

  response.assertBodyContains(
    {
      errors: [
        {
          message: 'The firstname field must be defined',
          rule: 'required',
          field: 'firstname'
        },
        {
          message: 'The lastname field must be defined',
          rule: 'required',
          field: 'lastname'
        },
        {
          message: 'The username field must be defined',
          rule: 'required',
          field: 'username'
        },
        {
          message: 'The email field must be defined',
          rule: 'required',
          field: 'email'
        },
        {
          message: 'The password field must be defined',
          rule: 'required',
          field: 'password'
        },
        {
          message: 'The confirm field must be defined',
          rule: 'required',
          field: 'confirm'
        }
      ]
    }
  )
});

test("invalid fields", async ({ client }) => {

  const response = await client
    .post(`api/auth/register`)
    .json({
      firstname: 2323,
      lastname: false,
      email: 2323,
      username: false,
      password: 3234234,
      confirm: true
    })

  response.assertBodyContains(
    {
      errors: [
        {
          message: 'The firstname field must be a string',
          rule: 'string',
          field: 'firstname'
        },
        {
          message: 'The lastname field must be a string',
          rule: 'string',
          field: 'lastname'
        },
        {
          message: 'The username field must be a string',
          rule: 'string',
          field: 'username'
        },
        {
          message: 'The email field must be a string',
          rule: 'string',
          field: 'email'
        },
        {
          message: 'The password field must be a string',
          rule: 'string',
          field: 'password'
        },
        {
          message: 'The confirm field must be a string',
          rule: 'string',
          field: 'confirm'
        }
      ]
    }
  )
});

test("confirm password", async ({ client }) => {

  const response = await client
    .post(`api/auth/register`)
    .json({
      firstname: "edriss",
      lastname: "aria",
      email: "adis@gmail.com",
      username: "adis",
      password: "sss",
      confirm: "aaa"
    })

  response.assertBodyContains(
    {
      errors: [
        {
          message: 'The confirm field and password field must be the same',
          rule: 'confirmed',
          field: 'confirm',
        }
      ]
    }
  )

});

test("invalid email format", async ({ client }) => {

  const response = await client
    .post(`api/auth/register`)
    .json({
      firstname: "edriss",
      lastname: "aria",
      email: "adis@gmail",
      username: "adis",
      password: "sss",
      confirm: "sss"
    })

  response.assertBodyContains({
    errors: [
      {
        message: 'The email field must be a valid email address',
        rule: 'email',
        field: 'email'
      }
    ]
  })
  
});
