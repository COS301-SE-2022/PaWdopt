import { Resolver, Query } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { CatType } from './api.dto'

@Resolver()
export class ApiResolver {
    constructor(private readonly catService: ApiService) {}

    @Query(returns => [CatType])
    async cats() {
        return this.catService.findAll();
    }
}