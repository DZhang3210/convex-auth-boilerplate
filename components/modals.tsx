"use client";

import { useEffect, useState } from "react";
import React from "react";
import ConfirmationModal from "./modals/confirmation-modal";

const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return "";
  return (
    <div>
      <ConfirmationModal />
    </div>
  );
};

export default Modals;
