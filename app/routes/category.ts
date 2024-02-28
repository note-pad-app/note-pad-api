import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
  router.resource('', '#controllers/category_controller')
  .apiOnly()
  .use("*",middleware.auth())
})
  .prefix("api/category")