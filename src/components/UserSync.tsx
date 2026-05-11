"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

export function UserSync() {
  const { user, isLoaded } = useUser();
  const storeUser = useMutation(api.users.storeUser);

  useEffect(() => {
    if (isLoaded && user) {
      storeUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || undefined,
      });
    }
  }, [isLoaded, user, storeUser]);

  return null;
}
