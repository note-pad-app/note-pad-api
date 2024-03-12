import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel';

router.group(() => {
    router.resource('notes', '#controllers/notes_controller')
        .apiOnly()
    router.patch("notes/:id/soft-delete", "#controllers/notes_controller.softDelete");
    router.patch("notes/:id/recover", "#controllers/notes_controller.recovery");
    router.patch("notes/:id/favorite", "#controllers/notes_controller.markAsFavorite");
})
    .use(middleware.auth())
    .prefix("api")