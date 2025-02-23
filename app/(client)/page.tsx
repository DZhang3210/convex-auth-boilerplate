"use client";

import { useState } from "react";
import FileUpload from "@/components/file-upload";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { Button } from "@/components/ui/button";
import useConfirm from "@/hooks/create-confirm-hook";

export default function Home() {
  const { data: user } = useCurrentUser();
  const [file, setFile] = useState<string | null>(null);
  const confirm = useConfirm();

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <FileUpload file={file} setFile={setFile} />
      <Button onClick={() => confirm.setIsOn(true)}>Confirm</Button>
    </div>
  );
}
