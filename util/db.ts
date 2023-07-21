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

  async init(): Promise<void> {
    try {
      DBProvider.db = createConnectionPool()
    } catch (e) {
      console.error(e)
      await DBProvider.db?.dispose()
    }
  }
}
