import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
    router.resource('note', '#controllers/note_controller')
        .apiOnly()
    router.patch("note/:id/soft_delete", "#controllers/note_controller.softDelete");
    router.patch("note/:id/recover", "#controllers/note_controller.recovery");
})
    .use(middleware.auth())
    .prefix("api")