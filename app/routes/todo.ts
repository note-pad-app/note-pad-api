import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
    router.resource('todos', '#controllers/todos_controller')
        .apiOnly()
    router.patch("todos/:id/soft-delete", "#controllers/todos_controller.softDelete");
    router.patch("todos/:id/recover", "#controllers/todos_controller.recovery");
    router.patch("todos/:id/complete", "#controllers/todos_controller.markAsCompleted");
})
    .use(middleware.auth())
    .prefix("api")