import {
  Connection,
  createPool,
  initOracleClient,
  Pool,
  PoolAttributes,
  ExecuteOptions,
  OUT_FORMAT_OBJECT
} from 'oracledb'
import { logger } from '../utils'

interface envOptions {
  user: string | undefined
  password: string | undefined
  connectString: string | undefined
}

export class DBProvider {
  private readonly dbConfig: envOptions
  private readonly providerAttributes?: PoolAttributes | undefined
  private pool: Pool | undefined
  constructor (configOptions?: envOptions, poolOptions?: PoolAttributes) {
    this.dbConfig = {
      user: configOptions?.user ?? process.env.ORACLEDB_USER,
      password: configOptions?.password ?? process.env.ORACLEDB_PASSWORD,
      connectString: configOptions?.connectString ?? process.env.ORACLEDB_CONNECT_STRING
    }
    // this.providerAttributes = poolOptions //TODO implement other options as we find we need them (poolMin/Max, etc.)
  }
