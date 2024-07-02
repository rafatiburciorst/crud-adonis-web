const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/index')

router
  .group(() => {
    router.get('/', [UsersController, 'index']).as('users.index')
    router.get('/create', [UsersController, 'create']).as('users.create')
    router.post('/', [UsersController, 'store']).as('users.store')
    router.get('/edit/:id', [UsersController, 'edit']).as('users.edit')
    router.put('/:id', [UsersController, 'update']).as('users.update')
    router.delete('/:id', [UsersController, 'destroy']).as('users.destroy')
  })
  .prefix('users')
