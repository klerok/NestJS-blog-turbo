import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SingInInput } from './dto/singin.input';
import { AuthPayload } from './entities/auth-payload.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async singIn(@Args('singInInput') singInInput: SingInInput) {
    const user = await this.authService.validateLocalUser(singInInput);

    return await this.authService.login(user);
  }
}
