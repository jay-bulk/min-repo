import createConnectionPool, {sql, ConnectionPool, SQLQuery} from '@databases/pg'


interface envOptions {
  user: string | undefined
  password: string | undefined
  connectString: string | undefined
}

export class DBProvider {
  private readonly dbConfig: envOptions
  private static db: ConnectionPool | undefined;

  constructor(configOptions?: envOptions) {
    this.dbConfig = {
      user: configOptions?.user ?? process.env.DB_USER,
      password: configOptions?.password ?? process.env.DB_PASSWORD,
      connectString: configOptions?.connectString ?? process.env.DB_CONNECT_STRING
    }
  }
  static async init (): Promise<void> {
    try {
     this.db = createConnectionPool()
    } catch (e) {
      console.error(e)
      await this.db?.dispose()
    }
  }

  async testConnection (db: ConnectionPool): Promise<Boolean> {
    try {
      if (db == null) {
        throw new Error('No connection pool. Did you run the init() function?')
      }
       const result = await db.query(sql`select 1 + 1 as result`)
      console.log(result)
      return true
    } catch (e) {
      console.error(e)
      await db?.dispose()
      return false
    }
  }

  async execute<T = unknown>(sql: SQLQuery): Promise<T[]> {
    if (DBProvider.db == null) {
      throw new Error('No connection. Did you ruyn the init() function?')
    }
    let result = await DBProvider.db.query(sql)
    return (result ?? [])
  }
}
export default DBProvider
