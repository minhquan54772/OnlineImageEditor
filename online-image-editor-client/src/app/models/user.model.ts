import { Project } from './project.model';
import { Subscription } from './subscription.model';

export class User {
  id!: string;
  email?: string;
  displayName?: string;
  password?: string;
  isVip?: boolean = false;
  subscriptionList?: Array<Subscription> = new Array();
  projectList?: Array<Project> = new Array();
}
