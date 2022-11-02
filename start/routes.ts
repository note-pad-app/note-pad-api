import Route from '@ioc:Adonis/Core/Route'

Route.post('register', 'UsersController.register')
Route.resource('user', 'UsersController')
Route.get('/', async () => {
  return { hello: 'world' }
})
