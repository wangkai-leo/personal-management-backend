import { Body, Controller, Post } from "@nestjs/common";
import { DimScope } from "./dto/scope.entity";
import { ScopeService } from "./scope.service";

@Controller('scope')
export class ScopeController{
  constructor(
    private scopeService:ScopeService,
    ){
  }

  @Post('add')
  async addScope(
    @Body() dimScope:DimScope
  ){
    return await this.scopeService.addScope(dimScope);
  }

  @Post('list')
  async getList(
  ){
    return await this.scopeService.getScopeList();
  }
}