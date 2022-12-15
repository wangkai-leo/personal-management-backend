import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScopeService } from "./scope.service";
import { ScopeController } from "./scope.controller";
import { DimScope } from "./dto/scope.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DimScope])],
  exports: [ScopeService],
  providers: [ScopeService],
  controllers: [ScopeController],
})

export class ScopeModule { };