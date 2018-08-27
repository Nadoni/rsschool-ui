import { ICouseUser } from './courseMentor';
import { IUserBase, IUser } from './user';

export interface ICourseStudent extends ICouseUser {
    englishLevel: string;
    mentors: Array<IUser & IUserBase>;
    user?: IUser;
}
