export interface Job {
  id: string;
  title: string;
  opType: string;
  description: string;
  responsibilities: string;
  idealCandidate: string;
  whenAndWhere: string;
  datePosted: string;
  deadline: string;
  startDate: string;
  endDate: string;
  location: string[];
  categories: string[];
  requiredSkills: string[];
  orgName: string;
  logoUrl: string;
  applicantsCount: number;
  viewsCount: number;
  status: string;
  isBookmarked: boolean;
  isPaid: boolean;
  engagementType: string;
  paymentOption: {
    currency: string;
    paymentType: string;
  };
}