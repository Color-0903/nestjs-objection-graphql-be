import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleResolver } from "./role.resolver";

@Module({
    imports: [],
    controllers: [],
    providers: [RoleService, RoleResolver],
    exports: [RoleService],
  })
  export class RoleModule {}
  