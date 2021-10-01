import url from 'url';
import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CrawlingTaskEntityDocument, CrawlingTaskEntitySchemaName } from './schemas/task.schema';
import { __createTaskByIdsLoader } from './loaders';
import { TASK_STATUS_TYPE } from './constants';
import {
  AddNewTaskDto
} from './dto';

@Injectable()
export class DataAccessCrawlingService {
  private readonly taskByIds: DataLoader<Types.ObjectId, CrawlingTaskEntityDocument> | null

  constructor(
    @InjectModel(CrawlingTaskEntitySchemaName)
    private readonly taskModel: Model<CrawlingTaskEntityDocument>
  ) {
    this.taskByIds = __createTaskByIdsLoader(this.taskModel);
  }

  // Get a single picture
  getTaskById(id: Types.ObjectId): Promise<CrawlingTaskEntityDocument> {
    return this.taskByIds.load(id);
  }

  // Get many picture
  getTaskByIds(ids: Types.ObjectId[]): Promise<(Error | CrawlingTaskEntityDocument)[]> {
    return this.taskByIds.loadMany(ids);
  }

  getTaskByLink(link: string): Promise<CrawlingTaskEntityDocument | undefined> {
    return this.taskModel.findOne({
      link
    }).exec();
  }

  getNextTask(): Promise<CrawlingTaskEntityDocument | undefined> {
    return this.taskModel.findOne({
      status: TASK_STATUS_TYPE.NEW,
      link: { $regex: /manga/, $options: 'i' }
    }).sort({
      updatedAt: 1
    }).exec();
  }

  async setTaskError(_id: Types.ObjectId): Promise<CrawlingTaskEntityDocument | undefined> {
    const isFound = await this.taskModel.findOne({
      _id
    });
    if(!isFound) {
      throw new Error(`not found ${_id} task`);
    }

    return this.taskModel.findOneAndUpdate({
      _id
    }, {
      $set:{
        status: TASK_STATUS_TYPE.ERROR
      }
    }, {new: true}).exec();
  }

  async setTaskInProgress(_id: Types.ObjectId): Promise<CrawlingTaskEntityDocument | undefined> {
    const isFound = await this.taskModel.findOne({
      _id
    });
    if(!isFound) {
      throw new Error(`not found ${_id} task`);
    }

    return this.taskModel.findOneAndUpdate({
      _id
    }, {
      $set:{
        status: TASK_STATUS_TYPE.IN_PROGRESS
      }
    }, {new: true}).exec();
  }

  async setTaskComplete(_id: Types.ObjectId): Promise<CrawlingTaskEntityDocument | undefined> {
    const isFound = await this.taskModel.findOne({
      _id
    });
    if(!isFound) {
      throw new Error(`not found ${_id} task`);
    }

    return this.taskModel.findOneAndUpdate({
      _id
    }, {
      $set:{
        status: TASK_STATUS_TYPE.COMPLETE
      }
    }, {new: true}).exec();
  }

  numberOfCurrentTask(): Promise<number> {
    return this.taskModel.countDocuments({
      status: TASK_STATUS_TYPE.IN_PROGRESS
    }).exec();
  }

  getLatestTaskInProgress(): Promise<CrawlingTaskEntityDocument> {
    return this.taskModel.findOne({
      status: TASK_STATUS_TYPE.IN_PROGRESS
    }).sort({
      updatedAt: -1
    }).exec();
  }

  async addNewTask({ link, payload = {} }: AddNewTaskDto): Promise<CrawlingTaskEntityDocument | undefined> {
    const u = url.parse(link);

    const isFound = await this.taskModel.findOne({
      link
    });

    if(isFound) {
      return isFound;
    }

    const task = new this.taskModel();
    task.link = link;
    task.host = u.host;
    task.payload = payload;

    return task.save();
  }
}
