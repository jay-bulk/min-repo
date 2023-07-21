import fp from 'fastify-plugin'
import DBprovider from '../util/db'
import {FastifyReply, FastifyRequest} from "fastify";

declare module 'fastify' {
  interface FastifyRequest {
    db: DBProvider
  }
}
export default fp(async function (fastify, opts) {
fastify.decorateRequest('db', null)
  await fastify.addHook('onRequest', (req: FastifyRequest, reply: FastifyReply, done) => {
    req.db = db
    done
  })
})



