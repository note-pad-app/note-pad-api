import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
  router.resource('category', '#controllers/categories_controller')
  .apiOnly()
})
  .middleware(middleware.auth())
  .prefix("api")