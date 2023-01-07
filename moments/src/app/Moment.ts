export interface Moment {
  id?: number;
  title: string;
  description: string;
  img: string;
  created_at?: string;
  updeated_at?: string;
  comments?: [{ text: string; username: string }];
}
