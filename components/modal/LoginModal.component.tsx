"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import LoginPage from "../login/Login.component";

const LoginModal: React.FC = () => {
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
      <button
        type="button"
        onClick={showModal}
        className="bg-customGreen hover:bg-green-800 text-white px-3 laptop:px-10 rounded-xl"
      >
        Se connecter
      </button>
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

export default LoginModal;
