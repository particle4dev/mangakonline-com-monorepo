export const MODULE_CONNECTION_NAME = 'Crawling_Module_Connection';

export enum TASK_STATUS_TYPE {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
  RETRY_REQUIRED = 'retry_required',
  ERROR = 'error',
  TO_BE_DELETED = 'to_be_deleted'
};
