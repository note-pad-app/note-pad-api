import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
    router.resource('todo', '#controllers/todo_controller')
        .apiOnly()
    router.patch("todo/:id/soft_delete", "#controllers/todo_controller.softDelete");
    router.patch("todo/:id/recover", "#controllers/todo_controller.recovery");
})
    .use(middleware.auth())
    .prefix("api")