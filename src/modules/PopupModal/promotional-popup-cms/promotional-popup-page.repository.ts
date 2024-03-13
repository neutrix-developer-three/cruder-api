import mongoose, { Model, Types } from 'mongoose';
import { PopupModalPage } from './schema/popup-modal-page.schema';

export class PopupModalPageRepository<PopupModalPageDocument extends PopupModalPage> {
    constructor(private readonly model: Model<PopupModalPageDocument>) { }

    async findAll(): Promise<PopupModalPage[]> {
        return await this.model.find();
    }


}