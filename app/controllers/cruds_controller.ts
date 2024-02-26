import type { HttpContext } from '@adonisjs/core/http'

export default class CrudsController {
  public model: any; 

  //display all data
  public async index({ response }: HttpContext) {
    const data = await this.model.all()

    return response.status(200).json(data);
  }

  //display single data by id
  public async show({ response, params }: HttpContext) {
    const data = await this.model.findOrFail(params.id);

    return response.status(200).json(data);
  }

  //store data
  public async store({ request, response }: HttpContext) {
    const payloud = await request.validateUsing(this.model.validator);
    const result = await this.model.create(payloud);

    return response.status(201).json(result);
  }

  //update single data
  public async update({ request, response, params }: HttpContext) {
    const data = await this.model.findOrFail(params.id);

    const payload = await request.validateUsing(this.model.validator);

    data.merge(payload);
    await data.save();

    return response.status(204).json(data);
  }

  //delete single data
  public async destroy({ response, params }: HttpContext) {
    const data = await this.model.findOrFail(params.id);
    data.delete();
    return response.status(202);
  }

  public async softDelete({ response, params }: HttpContext) {
    const data = await this.model.findOrFail(params.id);

    data.is_deleted = true;

    await data.save();

    return response.status(204);
  }

  public async recovery({ response, params }: HttpContext) {
    const data = await this.model.findOrFail(params.id);

    data.is_deleted = false;
    await data.save();

    return response.status(204);
  }
}