import Category from "#models/category";
import CategoryPolicy from "#policies/category_policy";
import CrudsController from "./cruds_controller.js";

export default class CategoriesController extends CrudsController{
    constructor() {
        super();
        this.model = Category
        this.policy = CategoryPolicy
    }
}