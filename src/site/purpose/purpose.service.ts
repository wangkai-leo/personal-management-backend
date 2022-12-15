import { Injectable } from "@nestjs/common";
import { PurposeInterface } from "./interface/purpose.interface";


@Injectable()
export class PurposeService implements PurposeInterface{
  constructor(){}
}