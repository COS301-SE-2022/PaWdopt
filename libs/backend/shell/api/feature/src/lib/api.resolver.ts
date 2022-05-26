import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class ApiResolver {
    @Query(returns => String)
    async hello() {
        return '👋';
    }
}