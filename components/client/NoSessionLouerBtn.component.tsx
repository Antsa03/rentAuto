"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import LoginPage from "../login/Login.component";
import LouerBtn from "./LouerBtn.component";

type Props = {
  disponible: boolean;
};

const NoSessionLouerBtn: React.FC<Props> = ({ disponible }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LouerBtn disponible={disponible} title="Louer" setOpen={showModal} />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginPage setShowModal={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default NoSessionLouerBtn;
