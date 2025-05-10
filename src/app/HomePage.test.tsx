import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import "@testing-library/jest-dom";

describe("HomePage", () => {
  it("renders the HomeBanner component", () => {
    render(<HomePage />);
    const bannerText = screen.getByText("Stay Sharp, Throw Anywhere");
    expect(bannerText).toBeInTheDocument();
  });

  it("renders the ListingGrid component", () => {
    render(<HomePage />);
    const listingTitle = screen.getByText("California Dream Art Gallery");
    expect(listingTitle).toBeInTheDocument();
  });

  it("renders the CategoryGrid component", () => {
    render(<HomePage />);
    const categoryTitle = screen.getByText("New York");
    expect(categoryTitle).toBeInTheDocument();
  });

  it("renders the EntertainmentSection component", () => {
    render(<HomePage />);
    const entertainmentSection = screen.getByText("Explore Our Events");
    expect(entertainmentSection).toBeInTheDocument();
  });
});
