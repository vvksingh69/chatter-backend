/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, database, up } from 'migrate-mongo';

//OnModuleInit - this is a lifecycle hook - that gets automatically called whenever the module
//is initialized for us.
//so by implementing the ONModuleInit - we get access to a function - onModuleInit - which gets called for us
//whenever the application is started.
@Injectable()
export class DbMigrationService implements OnModuleInit {
  private readonly dbMigrationConfig: Partial<config.Config> = {
    mongodb: {
      databaseName: this.configService.getOrThrow('DB_NAME'),
      url: this.configService.getOrThrow('MONGODB_URI'),
    },
    migrationsDir: `${__dirname}/../../migrations`,
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
  };
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    //after creating the dbMigrationConfig object - we need to set this up.
    config.set(this.dbMigrationConfig);
    const { db, client } = await database.connect();
    await up(db, client);
  }
}
