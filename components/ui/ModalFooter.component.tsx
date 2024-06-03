import { Form, Space } from "antd";
import React from "react";

type ModalFooterProps = {
  isValid: boolean;
  onCancel: () => void;
};

function ModalFooter({ onCancel, isValid }: ModalFooterProps) {
  return (
    <>
      <Form.Item className="text-center">
        <Space size="large">
          <button
            className={`h-10 w-[90px] font-semibold rounded-md  hover:bg-green-700 text-white ${
              isValid
                ? "bg-green-500"
                : "cursor-not-allowed opacity-50 bg-customGreen"
            }`}
            type="submit"
            disabled={!isValid}
          >
            Ok
          </button>
          <button
            type="button"
            className="h-10 w-[90px] font-semibold rounded-md bg-red-500 hover:bg-red-700 text-white"
            onClick={() => onCancel()}
          >
            Annuler
          </button>
        </Space>
      </Form.Item>
    </>
  );
}

export default ModalFooter;
