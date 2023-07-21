import createConnectionPool, {sql, ConnectionPool, SQLQuery} from '@databases/pg'


interface envOptions {
  user: string | undefined
  password: string | undefined
  connectString: string | undefined
}

export class DBProvider {
  private readonly dbConfig: envOptions
  db: ConnectionPool | undefined;

  constructor(configOptions?: envOptions) {
    this.dbConfig = {
      user: configOptions?.user ?? process.env.PGUSER,
      password: configOptions?.password ?? process.env.PGPASSWORD,
      connectString: configOptions?.connectString ?? process.env.DATABASE_URL
    }
  }

  async init(): Promise<void> {
    try {
      this.db = createConnectionPool()
    } catch (e) {
      console.error(e)
      await this.db?.dispose()
    }
  }
}
