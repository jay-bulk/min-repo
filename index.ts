import { app } from './app'

async function run (): Promise<void> {
  const fastify = await app()

  await fastify.listen({
    host: '0.0.0.0',
    port: 8080
  })
}

run()
  .then(r => {})
  .catch(err => console.log(err))
