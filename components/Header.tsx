"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BookMarkedIcon, BookOpen } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border shadow-md">
      <div className="container mx-auto px-6 flex h-16 items-center justify-between">
        {/* Logo & Search */}
        <div className="flex items-center gap-6">
          <Link href="/" prefetch={false} className="flex items-center gap-2 hover:opacity-80 transition">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Courselly
            </span>
          </Link>
          <div className="hidden md:block">
          <SearchInput  /></div>
        </div>

        {/* Navigation & User Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            href="/my-courses"
            prefetch={false}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-lg md:px-4 md:py-2"
          >
            <BookMarkedIcon className="h-5 w-5" />
            <span className="hidden md:inline">My Courses</span>
          </Link>

          <DarkModeToggle />

          <SignedIn>
            <UserButton />
          </SignedIn>
          
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default" size="sm" className="px-4 py-2">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}