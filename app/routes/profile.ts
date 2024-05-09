import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
  router.resource("profile", "#controllers/profiles_controller")
  .only(["show", "destroy", "update"])
  router.post("profile/upload-avatar", "#controllers/profiles_controller.uploadAvatar")
  router.get("profile-get-total", "#controllers/profiles_controller.getTotalData")
})
  .use(middleware.auth())
  .prefix("api")