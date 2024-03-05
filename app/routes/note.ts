import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
    router.resource('notes', '#controllers/note_controller')
        .apiOnly()
    router.patch("notes/:id/soft_delete", "#controllers/note_controller.softDelete");
    router.patch("notes/:id/recover", "#controllers/note_controller.recovery");
})
    .use(middleware.auth())
    .prefix("api")