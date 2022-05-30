import { Resolver, Query } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType } from './api.dto'

@Resolver()
export class ApiResolver {
    constructor(private readonly DogService: ApiService) {}

    @Query(returns => [DogType])
    async Dogs() {
        return this.DogService.findAll();
    }
}