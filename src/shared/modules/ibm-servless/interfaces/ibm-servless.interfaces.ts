export type iStartNewAction = {
  action: string;
  data: iStartNewActionData;
  waitForResult: boolean;
};

export interface iStartNewActionData {
  message_per_runs_id_name: string;
  leadId: string;
}
