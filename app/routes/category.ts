import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
  router.resource('categories', '#controllers/categories_controller')
  .apiOnly()
})
  .middleware(middleware.auth())
  .prefix("api")