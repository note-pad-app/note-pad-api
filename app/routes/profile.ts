import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
  router.group(() => {
    router.get("profile/show", "#controllers/profile_controller.show")
    router.put("profile/edit", "#controllers/profile_controller.edit")
    router.delete("profile/remove", "#controllers/profile_controller.remove")
  })
  .use(middleware.auth())
})
  .prefix("api")