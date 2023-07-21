import { app } from '../app'
import { FastifyInstance } from 'fastify'

describe('health route unit test', () => {
  let fastify: FastifyInstance

  beforeAll(async () => {
    fastify = await app()
  })
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('GET hello world', () => {
    test('test health check response', async () => {
      const res = await fastify.inject({
        url: '/'
      })
      expect(res.statusCode).toEqual(200)
    })
  })
})
