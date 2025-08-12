import axios from "axios";
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Edit, Eliminar } from "../../icons";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

export default function TiposMasa() {
  const [loading, setLoading] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [error, setError] = useState("");
  const [nomEliminar, setNomEliminar] = useState("");
  const token = localStorage.getItem('token');
  const [tiposMasa, setTiposMasa] = useState([]);
  const [idActualizar, setIdActualizar] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
    nombre: "",
  });

  const getTiposMasa = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://localhost:7276/api/TiposMasa',
        headers: {
          Authorization: `Beare ${token}`
        }
      };

      const response = await axios.request(options);
      setTiposMasa(response.data);
    } catch (error) {
      console.error("Error obteniendo tipos de masa:", error);
    }
  };

  useEffect(() => {
    getTiposMasa();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    try {
      if (actualizando) {
        const response = await axios.put(
          `https://localhost:7276/api/TiposMasa/${idActualizar}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Beare ${token}`
            },
          }
        );
        console.log("Respuesta:", response.data);
        setActualizando(false);
      } else {
        const response = await axios.post(
          "https://localhost:7276/api/TiposMasa",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Beare ${token}`
            },
          }
        );
        console.log("Respuesta:", response.data);
      }
      getTiposMasa();
      setFormData({
        nombre: ""
      });
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setError("Error al guardar el tipo de masa");
    } finally {
      setLoading(false); // Fin carga
    }
  };

  const cancelarEdit = () => {
    setActualizando(false);
    setIdActualizar(0);
    setFormData({
      nombre: ""
    });
  }

  const cancelarEliminar = () => {
    setIdActualizar(0);
    setNomEliminar("");
    closeModal();
  }

  const handleEdit = (id: number, nombre: string) => {
    setIdActualizar(id);
    setActualizando(true);
    setFormData({
      nombre: nombre
    });
  }

  const handleDelete = async (id: number, nombre: string) => {
    setIdActualizar(id);
    setNomEliminar(nombre);
    openModal();
  }

  const envioEliminar = async () => {
    await axios.delete(
      `https://localhost:7276/api/TiposMasa/${idActualizar}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beare ${token}`
        },
      }
    );
    setIdActualizar(0);
    setNomEliminar("");
    closeModal();
  }

  return (
    <div>
      <PageMeta
        title=""
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <Modal
        isOpen={isOpen}
        onClose={cancelarEliminar}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              Eliminar tipo de masa
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ¿Esta seguro que desea eliminar el tipo de masa {nomEliminar}?
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={cancelarEliminar}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={envioEliminar}
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
      <PageBreadcrumb pageTitle="Tipos de masa" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 col-span-1">
          <form onSubmit={handleSubmit}>
            <ComponentCard title={actualizando ? `Actualizar tipo de masa` : `Crear tipo de masa`}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="input">Descripción</Label>
                  <Input type="text" value={formData.nombre} onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  } name="nombre" id="input" />
                </div>
                {error && (
                  <div className="mb-4 text-red-500 text-sm">
                    {error}
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"></div>
              <div className="flex justify-end">
                {
                  !actualizando ? "" : <Button onClick={cancelarEdit} size="sm" variant="outline">
                    Cancelar
                  </Button>
                }
                <Button type="submit" size="sm" variant="primary">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    actualizando ? `Actualizar` : "Guardar"
                  )}
                </Button>
              </div>
            </ComponentCard>
          </form>
        </div>
        <div className="space-y-6 col-span-2">
          <ComponentCard title="Tipos de masa creados">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    #
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Descripción
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tiposMasa.length > 0 ? (
                  tiposMasa.map((masa: any, index: number) => (
                    <TableRow key={masa.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {index + 1}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {masa.nombre}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <button
                          onClick={() => handleEdit(masa.id, masa.nombre)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit className="size-7" stroke="red" />
                        </button>
                        <button
                          onClick={() => handleDelete(masa.id, masa.nombre)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Eliminar className="size-7" stroke="red" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">

                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          Sin Registros
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">

                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
