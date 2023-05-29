import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  serialize(value: unknown) {
    if (typeof value === 'string') {
      return value as string; // Convert outgoing Date to ISO string
    }
    if(value instanceof Date) {
      return value.toISOString();
    }
    throw new Error('DateTime cannot represent non string type');
  }
  parseValue(value: unknown) {
    if (typeof value !== 'string') {
      throw new Error('DateTime cannot parse a non-string value');
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(
        'DateTime cannot represent an invalid ISO-8601 Date string'
      );
    }
    return date; // Convert incoming ISO string to Date
  }
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert incoming AST string to Date
    }
    throw new Error('DateTime cannot represent non string type');
  }
}
