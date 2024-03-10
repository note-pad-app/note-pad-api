import type { HttpContext } from '@adonisjs/core/http'

export default class CrudsController {
  public model: any;
  public policy: any;

  //display all data
  public async index({ response, request, auth }: HttpContext) {
    let params = request.qs();

    const result = await this.model.listOptions(params, auth.user!.id)

    return response.status(200).json(result);
  }

  //display single data by id
  public async show({ response, params, bouncer }: HttpContext) {
    const data = await this.model.firstOrFailWithPreloads(params.id);

    if (await bouncer.with(this.policy).denies('show', data)) {
      return response.forbidden('Cannot see this data')
    }

    return response.status(200).json(data);
  }

  //store data
  public async store({ request, response, auth }: HttpContext) {
    const payloud = await request.validateUsing(this.model.storeValidator);
    const result = await this.model.create({ ...payloud, user_id: auth.user!.id });

    return response.status(201).json(result);
  }

  //update single data
  public async update({ request, response, params, bouncer }: HttpContext) {
    const data = await this.model.findOrFail(params.id);
    const payload = await request.validateUsing(this.model.updateValidator);

    if (await bouncer.with(this.policy).denies('edit', data)) {
      return response.forbidden('Cannot edit this data')
    }

    data.merge(payload);

    await data.save();

    return response.status(204).json(data);
  }

  //delete single data
  public async destroy({ response, params, bouncer }: HttpContext) {
    const data = await this.model.findOrFail(params.id);

    if (await bouncer.with(this.policy).denies('delete', data)) {
      return response.forbidden('Cannot delete this data')
    }

    data.delete();
    return response.status(202);
  }

  public async softDelete({ response, params, bouncer }: HttpContext) {
    const data = await this.model.findOrFail(params.id);

    if (await bouncer.with(this.policy).denies('edit', data)) {
      return response.forbidden('Cannot delete this data')
    }

    data.is_deleted = true;

    await data.save();

    return response.status(204);
  }

  public async recovery({ response, params, bouncer }: HttpContext) {
    const data = await this.model.findOrFail(params.id);

    if (await bouncer.with(this.policy).denies('edit', data)) {
      return response.forbidden('Cannot edit this data')
    }

    data.is_deleted = false;

    await data.save();

    return response.status(204);
  }
}