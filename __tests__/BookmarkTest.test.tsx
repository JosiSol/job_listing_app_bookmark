import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../app/store"; // Assuming this is your actual store setup
import BookmarkButton from "@/app/components/BookmarkButton";

// Mock the entire apiSlice module, including jobsApi object
jest.mock("../app/services/apiSlice", () => {
  const actual = jest.requireActual("../app/services/apiSlice");
  return {
    ...actual,
    jobsApi: {
      reducerPath: "jobsApi",
      // Return a reducer that always returns a valid initial state
      reducer: (state = {}, action: any) => state,
      // Mock middleware as a function that returns the input (identity)
      middleware: () => (next: any) => (action: any) => next(action),
    },
    useAddBookmarkMutation: () => [
      jest.fn().mockResolvedValue({}),
      { isLoading: false },
    ],
    useRemoveBookmarkMutation: () => [
      jest.fn().mockResolvedValue({}),
      { isLoading: false },
    ],
    useGetBookmarksQuery: () => ({ refetch: jest.fn() }),
    useGetJobsQuery: () => ({ refetch: jest.fn() }),
  };
});

const mockJob = {
  id: "test-id",
  title: "Test Job",
  opType: "",
  description: "",
  responsibilities: "",
  idealCandidate: "",
  whenAndWhere: "",
  datePosted: "",
  deadline: "",
  startDate: "",
  endDate: "",
  location: [],
  categories: [],
  requiredSkills: [],
  orgName: "Test Org",
  logoUrl: "",
  applicantsCount: 0,
  viewsCount: 0,
  status: "",
  isBookmarked: false,
  isPaid: false,
  engagementType: "",
  paymentOption: { currency: "", paymentType: "" },
};

describe("BookmarkButton", () => {
  it("renders the button correctly", () => {
    render(
      <Provider store={store}>
        <BookmarkButton job={mockJob} bookmarked={false} />
      </Provider>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("calls the add bookmark mutation when clicked and not bookmarked", async () => {
    // Dynamically import the mocked module to get the mock function
    const apiSlice = require("../app/services/apiSlice");
    const mockAddBookmark = jest.fn().mockResolvedValue({});
    apiSlice.useAddBookmarkMutation = () => [
      mockAddBookmark,
      { isLoading: false },
    ];

    render(
      <Provider store={store}>
        <BookmarkButton job={mockJob} bookmarked={false} />
      </Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Check if our mock mutation function was called
    expect(mockAddBookmark).toHaveBeenCalledWith(mockJob);
  });
});
