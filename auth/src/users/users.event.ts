import { nats_subject, NatsService } from "@bivajon/common";
import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersEvent {

  constructor(private readonly natsService: NatsService) { }

    public async publishCreateUser(userData: User) {

    await this.natsService.publish(nats_subject.userCreated, {
      id: userData.id,
      name: userData.name,
      __v: 1
    });

  }


}
