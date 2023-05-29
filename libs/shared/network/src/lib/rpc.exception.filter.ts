import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ApolloError } from 'apollo-server-express';

interface GraphQLError {
  message: string;
  extensions: {
    code: string;
  };
  stacktrace: string[];
}

@Catch(RpcException)
export class ApolloErrorFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError() as GraphQLError;
    if(!error.message) {
      error.message = 'Internal Server Error';
    }
    const apolloError =  new ApolloError(error.message, error.extensions.code);
    if (apolloError) {
      throw apolloError;
    }
    throw exception;
  }

}