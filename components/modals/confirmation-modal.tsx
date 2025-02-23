"use client";
import React from "react";
import useConfirm from "@/hooks/create-confirm-hook";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";

const ConfirmationModal = () => {
  const confirm = useConfirm();
  return (
    <Modal
      isOpen={confirm.isOn}
      onClose={() => confirm.setIsOn(false)}
      className="bg-white/80 p-8"
    >
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-bold">Confirm Delete</h1>
        <p className="text-sm text-gray-800">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex flex-row gap-x-2 items-end justify-end">
          <Button variant="outline" onClick={() => confirm.setIsOn(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirm.onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
