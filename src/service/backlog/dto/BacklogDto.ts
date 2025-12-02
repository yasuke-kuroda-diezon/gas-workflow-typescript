export type GetIssueResponse = {
  issueKey: string;
  summary: string;
  assignee: {
    userId: string;
    name: string;
  };
  dueDate: string | null;
};

export const IssueKeyType = {
  // ▼headless.
  DEV_HEADLESS_1: "DEV_HEADLESS-1",
  // ▼hazaiya.
  HZY_SHARED_1: "HZY_SHARED-1",
  // ▼cores.
  CORES_SHARED_1: "CORES_SHARED-1",
  DEV_CORES_1: "DEV_CORES-1",
  // ▼circluxe.
  DEV_CIRCLUXE_1: "DEV_CIRCLUXE-1",
  DEV_CIRCLUXE_2: "DEV_CIRCLUXE-2",
} as const;

export type IssueKeyType = (typeof IssueKeyType)[keyof typeof IssueKeyType];
export type IssueIdType = number;
export type IdType = number;
export type IssueIdOrKeyType = IssueIdType | IssueKeyType;
