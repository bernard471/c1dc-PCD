export interface CompletedAction {
  actionId: number;
  title: string;
  isCompleted: boolean;
  completedAt: Date | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}