import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
    router.resource('todos', '#controllers/todo_controller')
        .apiOnly()
    router.patch("todos/:id/soft_delete", "#controllers/todos_controller.softDelete");
    router.patch("todos/:id/recover", "#controllers/todos_controller.recovery");
    router.patch("todos/:id/completed", "#controllers/note_controller.markAsCompleted");
    router.get("todos/search", "#controllers/note_controller.search")
})
    .use(middleware.auth())
    .prefix("api")