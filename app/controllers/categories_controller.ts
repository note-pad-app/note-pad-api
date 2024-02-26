import Category from "#models/category";
import CrudsController from "./cruds_controller.js";

export default class CategoriesController extends CrudsController{
    constructor() {
        super();
        this.model = Category
    }
}