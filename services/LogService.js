import Log from "../models/Log.js";

export const getAll = async () => await Log.findAll();
export const getById = async (id) => await Log.findByPk(id);
export const create = async (data) => await Log.create(data);
export const update = async (id, data) => {
    const item = await Log.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await Log.findByPk(id);
    return item ? await item.destroy() : null;
};