import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiGatewayFeatureModule } from '@schoolinc/api-gateway/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    ApiGatewayFeatureModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      csrfPrevention: false,
      playground: true,
      driver: ApolloDriver,
      autoSchemaFile: true,
      include: [ApiGatewayFeatureModule],
    }),
    
  ],
})
export class ApiGatewayCoreModule {}
