"use client";

import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "../services/apiSlice";
import { Bookmark, BookmarkPlus } from "lucide-react";
import { Button } from "@/ui_components/ui/button";
import React, { useEffect, useState } from "react";
import { useGetBookmarksQuery, useGetJobsQuery } from "../services/apiSlice";

import { Job } from "../data";

interface Props {
  job: Job;
  bookmarked: boolean;
}

const BookmarkButton = ({ job, bookmarked }: Props) => {
  const [addBookmark, { isLoading: isAdding }] = useAddBookmarkMutation();
  const [removeBookmark, { isLoading: isRemoving }] =
    useRemoveBookmarkMutation();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const { refetch: refetchBookmarks } = useGetBookmarksQuery();
  const { refetch: refetchJobs } = useGetJobsQuery();

  useEffect(() => {
    setIsBookmarked(bookmarked);
  }, [bookmarked]);

  const handleBookmark = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (!isBookmarked) {
        await addBookmark(job).unwrap();
        setIsBookmarked(true);
      } else {
        await removeBookmark(job.id).unwrap();
        setIsBookmarked(false);
      }
      refetchBookmarks();
      refetchJobs();
    } catch (e) {
      console.error("Bookmark action failed:", e);
      alert("Failed to update bookmark. Please try again.");
    }
  };

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={handleBookmark}
      disabled={isAdding || isRemoving}
      className={
        isBookmarked
          ? "bg-amber-200 hover:bg-amber-400"
          : "bg-gray-100 hover:bg-gray-300"
      }
    >
      {isBookmarked ? (
        <BookmarkPlus className="text-2xl cursor-pointer"></BookmarkPlus>
      ) : (
        <Bookmark className="text-2xl cursor-pointer"></Bookmark>
      )}
    </Button>
  );
};

export default BookmarkButton;
