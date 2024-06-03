import Swal from "sweetalert2";

export const useSetDispo = (url: string, onSuccess?: () => void) => {
  const handleSetDispo = async (id: string | number) => {
    try {
      const result = await Swal.fire({
        title: "Disponibilité du véhicule",
        text: "Voulez-vous rendre le véhicule disponible?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
        // customClass: "custom-alert",
      });
      if (result.isConfirmed) {
        const response = await fetch(`${url}/${id}/set-dispo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          if (onSuccess) onSuccess();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSetDispo };
};
