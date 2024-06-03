import { Location } from "@prisma/client";
import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Control, Controller } from "react-hook-form";
import ModalFooter from "../ui/ModalFooter.component";
import getNumberOfDaysBetweenDates from "@/lib/getNumberOfDaysBetweenDates";

type ClientLocationFormProps = {
  control: Control<Location>;
  isValid: boolean;
  prix_par_jour: number;
  onFinish: () => void;
  onCancel: () => void;
};

function ClientLocationForm({
  control,
  isValid,
  prix_par_jour,
  onFinish,
  onCancel,
}: ClientLocationFormProps) {
  let prix_total: number | null =
    prix_par_jour *
    getNumberOfDaysBetweenDates(
      control._getWatch("date_debut"),
      control._getWatch("date_fin")
    );
  if (!control._getWatch("date_debut") || !control._getWatch("date_fin"))
    prix_total = null;
  return (
    <Form
      labelCol={{ span: 7 }}
      onSubmitCapture={onFinish}
      style={{ marginTop: 2, marginBottom: 2 }}
    >
      <Controller
        control={control}
        name="date_debut"
        rules={{ required: "La date de début est requise" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Date de début"
            required
            help={error ? error.message : ""}
            validateStatus={error ? "error" : "success"}
          >
            <DatePicker
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString().slice(0, 10) : null);
              }}
            />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="date_fin"
        rules={{ required: "La date de fin est requise" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Date de fin"
            required
            help={error ? error.message : ""}
            validateStatus={error ? "error" : "success"}
          >
            <DatePicker
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date : null);
              }}
            />
          </Form.Item>
        )}
      />

      <Form.Item label="Prix total">
        <Input
          style={{ width: 200 }}
          className="text-center font-semibold"
          value={prix_total ? prix_total.toLocaleString() : ""}
          readOnly
          defaultChecked
        />
        <span className="ml-2 font-semibold">Ar</span>
      </Form.Item>
      <ModalFooter isValid={isValid} onCancel={onCancel} />
    </Form>
  );
}

export default ClientLocationForm;
