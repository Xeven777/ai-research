import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Link href="/gen">
        <Button>Start Generating</Button>
      </Link>
    </div>
  );
};

export default page;
