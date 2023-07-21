import fp from 'fastify-plugin'
import verify from "../util/auth";
import {FastifyReply, FastifyRequest} from "fastify";

declare module 'fastify' {
  interface FastifyRequest {
    auth: {
      header: {
        alg: string,
        typ: string
      },
      payload: {
        a: number,
        b: number,
        c: number,
        iat: number
      },
      signature: string,
      input: string
    }
  }
}

export default fp(async (fastify) => {
  fastify.decorateRequest('auth', null)

  await fastify.addHook('preHandler', async (req: FastifyRequest, reply: FastifyReply) => {
    req.auth = {
      header: {
        alg: 'HS512',
        typ: 'JWT'
      },
      payload: {
        a: 1,
        b: 2,
        c: 3,
        iat: 124333434
      },
      signature: 'malskdfjaslkfjsalfkjs1jOIKJOIJ!@OJj2kj3er1o2ijo',
      input: 'eyJhsdflkasjfwoijJSlkdfj12qeijpo2ij'
    }
  })
})
