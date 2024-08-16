import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CellsModule } from 'src/modules/cells/cells.module';
import { SellersModule } from 'src/modules/sellers/sellers.module';
import { UsersModule } from 'src/modules/users/users.module';
import { configLoaderHelper } from 'src/shared/helpers/config-loader.helper';
import { envSchema } from 'src/shared/validators/env-schema';
import { CustomerModule } from './modules/customer/customer.module';
import { EditionModule } from './modules/edition/edition.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoaderHelper],
      validationSchema: envSchema,
    }),
    AuthModule,
    UsersModule,
    CellsModule,
    SellersModule,
    CustomerModule,
    EditionModule,
  ],
  controllers: [],
  providers: [
    /* {
      provide: APP_GUARD,
      useClass: ProfilesGuard,
    }, */
  ],
})
export class AppModule {
  static port: string;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT');
  }
}
