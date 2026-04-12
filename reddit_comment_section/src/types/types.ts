export type Comment = {
  id: string;
  text: string;
  child: Comment[]
}