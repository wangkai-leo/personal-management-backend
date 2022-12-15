import { UserLoginDto } from "../dto/user.dto";
import { EntityUser } from '../dto/user.entity';

export interface UserInterface{
  
  registUser:(EntityUser) => void;
  loginUser:(userLoginDto:UserLoginDto)=> void;
}