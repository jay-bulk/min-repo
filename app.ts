import Fastify, {FastifyInstance} from 'fastify'
import db from "./plugins/db";
import auth from './plugins/auth'
export async function app (): Promise<FastifyInstance> {
  let fastify: FastifyInstance = Fastify({})
  await fastify.register(db)
  await fastify.register(auth)

  fastify.get('/', function (request, reply) {
    reply.send({hello: 'world'})
  })
  return fastify
}




