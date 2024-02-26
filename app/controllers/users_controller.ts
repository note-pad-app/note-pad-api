import User from "#models/user";
import CrudsController from "./cruds_controller.js";

export default class UsersController extends CrudsController{
    constructor(){
        super();
        this.model = User;
    }
}