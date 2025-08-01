import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { SessionProvider } from "next-auth/react";
import JobCard from "@/app/components/JobCard";

// 1. Mock the child component to isolate the JobCard
jest.mock("@/app/components/BookmarkButton", () => {
  // The mock just needs to return a simple element
  return function DummyBookmarkButton() {
    return <button>Bookmark</button>;
  };
});

// 2. Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

// A more complete mock job object based on your component's usage
const mockJobData = {
  id: "1",
  title: "Frontend Developer",
  orgName: "Tech Corp",
  location: ["Remote"], // location should be an array as per your component
  description: "Job description",
  isBookmarked: false,
  categories: ["Tech", "Development"],
  opType: "Full-time",
  logoUrl: "",
  // Add any other properties your JobCard component might need to avoid errors
};

describe("JobCard", () => {
  it("renders job title and company name", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          {/* 3. Pass the 'job' object as a single prop */}
          <JobCard job={mockJobData} />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    // Use a regex for flexibility with spacing and other characters
    expect(screen.getByText(/Tech Corp • Remote/)).toBeInTheDocument();
    // You can also test for the mock bookmark button
    expect(screen.getByText("Bookmark")).toBeInTheDocument();
  });
});
