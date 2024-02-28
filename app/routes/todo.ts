import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
    router.resource('', '#controllers/todo_controller')
        .apiOnly()
    router.patch(":id/soft_delete", "#controllers/todo_controller.softDelete");
    router.patch(":id/recover", "#controllers/todo_controller.recovery");
})
    .use(middleware.auth())
    .prefix("api/todo")