import ClientType from "@/types/Client.type";
import { Location, Vehicule } from "@prisma/client";
import { DatePicker, Form, Select, Space } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Control, Controller } from "react-hook-form";
import ModalFooter from "../ui/ModalFooter.component";

type LocationFormProps = {
  clients: ClientType[] | undefined;
  vehicules: Vehicule[] | undefined;
  control: Control<Location>;
  isValid: boolean;
  onFinish: () => void;
  onCancel: () => void;
};

const OptionRender = ({ label, imgSrc }: { label: string; imgSrc: string }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={imgSrc}
        alt={label}
        style={{ width: 80, height: 80, marginRight: 10, borderRadius: 2 }}
      />
      <span>{label}</span>
    </div>
  );
};

function LocationForm({
  clients,
  vehicules,
  control,
  isValid,
  onFinish,
  onCancel,
}: LocationFormProps) {
  const client_options = clients?.map((client) => ({
    value: client.id_client,
    label:
      client.id_client +
      ": " +
      client.utilisateur.nom +
      " " +
      client.utilisateur.prenom,
  }));

  const vehicule_options = vehicules
    ?.filter((vehicule) => vehicule.disponible)
    .map((vehicule) => ({
      value: vehicule.immatriculation,
      label: (
        <OptionRender
          label={
            vehicule.immatriculation +
            ": " +
            vehicule.marque +
            " " +
            vehicule.modele
          }
          imgSrc={`https://1s8t6r0ul8oomt8j.public.blob.vercel-storage.com/${vehicule.image_vehicule}`}
        />
      ),
    }));
  return (
    <Form
      labelCol={{ span: 5 }}
      onSubmitCapture={onFinish}
      style={{ marginTop: 2, marginBottom: 2 }}
    >
      <Controller
        control={control}
        name="id_client"
        rules={{ required: "L'ID client est requis" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="ID client"
            required
            help={error ? error.message : ""}
            validateStatus={error ? "error" : "success"}
          >
            <Select defaultValue="" {...field} options={client_options} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="immatriculation"
        rules={{ required: "L'immatriculation est requise" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Immatriculation"
            required
            help={error ? error.message : ""}
            validateStatus={error ? "error" : "success"}
          >
            <Select
              defaultValue=""
              {...field}
              options={vehicule_options}
              style={{ height: 90 }}
            />
          </Form.Item>
        )}
      />
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
      <ModalFooter isValid={isValid} onCancel={onCancel} />
    </Form>
  );
}

export default LocationForm;
