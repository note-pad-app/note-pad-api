import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
  router.group(() => {
    router.get("show", "#controllers/profile_controller.show")
    router.put("edit", "#controllers/profile_controller.edit")
    router.delete("remove", "#controllers/profile_controller.remove")
  })
  .use(middleware.auth())
})
  .prefix("api/profile")