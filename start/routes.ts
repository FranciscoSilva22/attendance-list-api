/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SessionController from '#controllers/session_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';
import PresencesController from '#controllers/presences_controller';

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', [SessionController, 'post']);
router.group(() => {
  router.get('/presence/all', [PresencesController, 'all'])
  router.get('/presence', [PresencesController, 'index'])
  router.post('/presence', [PresencesController, 'post'])
  router.put('/presence/:presence_id', [PresencesController, 'update'])
  router.delete('/presence/:presence_id', [PresencesController, 'delete'])
}).use([middleware.auth()]);