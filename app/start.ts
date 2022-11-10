import { app } from './server'
app()
  .then(server => server.listen(3000))
  .catch(err => console.log(err))
