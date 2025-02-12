import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
  router.resource("profile", "#controllers/profiles_controller")
  .only(["update","show", "destroy"])
  router.group(()=>{
    router.post("upload-avatar", "#controllers/profiles_controller.uploadAvatar")
    router.get("data/get-total", "#controllers/profiles_controller.getTotalData")
  }).prefix("profile")
})
  .use(middleware.auth())
  .prefix("api")