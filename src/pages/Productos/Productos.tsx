import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
// import { Modal } from "../../components/ui/modal";
// import { useModal } from "../../hooks/useModal";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import { Eliminar } from "../../icons";

export default function Productos() {
    // const { isOpen, closeModal } = useModal();
    type Option = { value: string; label: string };
    const [tamanoCantidad, setTamanoCantidad] = useState<Option[]>([]);
    const [tipoMasa, setTipoMasa] = useState<Option[]>([]);
    const [tipoRelleno, setTipoRelleno] = useState<Option[]>([]);
    const [tipoEnvoltura, setTipoEnvoltura] = useState<Option[]>([]);
    const [nivelPicante, setNivelPicante] = useState<Option[]>([]);
    const [tiposEndulzante, setTiposEndulzante] = useState<Option[]>([]);
    const [tipoTopping, setTipoTopping] = useState<Option[]>([]);
    const [mostrarCreacion, setMostrarCreacion] = useState(false);
    const [tipoProducto, setTipoProducto] = useState("");
    const [idLinea, setIdLinea] = useState(1);
    const [costoAdicional, setCostoAdicional] = useState("");
    const selectRef = useRef<HTMLSelectElement>(null);

    const [formDataNuevoProducto, setFormDataNuevoProducto] = useState({
        tipoProducto: "",
        valorTipoProducto: "",
        tamanoCantidad: "",
        valorTamanoCantidad: "",
        descripcion: "",
        precioBase: "",

        tipoMasa: "",
        valorTipoMasa: "",
        tipoRelleno: "",
        valorTipoRelleno: "",
        tipoEnvoltura: "",
        valorTipoEnvoltura: "",
        nivelPicante: "",
        valorNivelPicante: "",

        tipoEndulzante: "",
        valorTipoEndulzante: "",
        tipoTopping: "",
        valorTipoTopping: "",

        costoExtra: "",
    });

    interface PreGuardar {
        id: number;
        tipoProducto: string;
        valorTipoProducto: string;
        tamanoCantidad: string;
        valorTamanoCantidad: string;
        descripcion: string;
        precioBase: string

        tipoMasa: string;
        valorTipoMasa: string;
        tipoRelleno: string;
        valorTipoRelleno: string;
        tipoEnvoltura: string;
        valorTipoEnvoltura: string;
        nivelPicante: string;
        valorNivelPicante: string;

        tipoEndulzante: string;
        valorTipoEndulzante: string;
        tipoTopping: string;
        valorTipoTopping: string;

        costoExtra: string;
    }

    // Correcto: usando genéricos en useState
    const [listadoPreGuardar, setListadoPreGuardar] = useState<PreGuardar[]>([]);


    const token = localStorage.getItem('token');

    const getDatosIniciales = async () => {
        try {
            const optionsTipoMasa = {
                method: 'GET',
                url: 'https://localhost:7276/api/TiposMasa',
                headers: {
                    Authorization: `Beare ${token}`
                }
            };

            const responseTipoMasa = await axios.request(optionsTipoMasa);
            const listadoTipoMasa = responseTipoMasa.data;
            let options: ((prevState: { value: string; label: string; }[]) => { value: string; label: string; }[]) | { value: any; label: any; }[] = [];
            listadoTipoMasa.forEach((nav: { nombre: any; id: any; }) => {
                console.log(nav.nombre)
                options.push({ value: nav.id, label: nav.nombre });
            });
            setTipoMasa(options);

            const optionsTipoEnvoltura = {
                method: 'GET',
                url: 'https://localhost:7276/api/TiposEnvoltura',
                headers: {
                    Authorization: `Beare ${token}`
                }
            };

            const responseTipoEnvoltura = await axios.request(optionsTipoEnvoltura);
            const listadoTipoEnvoltura = responseTipoEnvoltura.data;
            let optionsEnvoltura: ((prevState: { value: string; label: string; }[]) => { value: string; label: string; }[]) | { value: any; label: any; }[] = [];
            listadoTipoEnvoltura.forEach((nav: { nombre: any; id: any; }) => {
                optionsEnvoltura.push({ value: nav.id, label: nav.nombre });
            });
            setTipoEnvoltura(optionsEnvoltura);

            const optionsTipoRelleno = {
                method: 'GET',
                url: 'https://localhost:7276/api/TiposRelleno',
                headers: {
                    Authorization: `Beare ${token}`
                }
            };

            const responseTipoRelleno = await axios.request(optionsTipoRelleno);
            const listadoTipoRelleno = responseTipoRelleno.data;
            let optionsTR: ((prevState: { value: string; label: string; }[]) => { value: string; label: string; }[]) | { value: any; label: any; }[] = [];
            listadoTipoRelleno.forEach((nav: { nombre: any; id: any; }) => {
                optionsTR.push({ value: nav.id, label: nav.nombre });
            });
            setTipoRelleno(optionsTR);

            const optionsNivelPicante = {
                method: 'GET',
                url: 'https://localhost:7276/api/NivelesPicante',
                headers: {
                    Authorization: `Beare ${token}`
                }
            };

            const responseNivelPicante = await axios.request(optionsNivelPicante);
            const listadoNivelPicante = responseNivelPicante.data;
            let optionsNP: ((prevState: { value: string; label: string; }[]) => { value: string; label: string; }[]) | { value: any; label: any; }[] = [];
            listadoNivelPicante.forEach((nav: { nombre: any; id: any; }) => {
                optionsNP.push({ value: nav.id, label: nav.nombre });
            });
            setNivelPicante(optionsNP);

            const optionsTipoEndulzante = {
                method: 'GET',
                url: 'https://localhost:7276/api/TiposEndulzante',
                headers: {
                    Authorization: `Beare ${token}`
                }
            };

            const responseTipoEndulzante = await axios.request(optionsTipoEndulzante);
            const listadoTipoEndulzante = responseTipoEndulzante.data;
            let optionsTE: ((prevState: { value: string; label: string; }[]) => { value: string; label: string; }[]) | { value: any; label: any; }[] = [];
            listadoTipoEndulzante.forEach((nav: { nombre: any; id: any; }) => {
                optionsTE.push({ value: nav.id, label: nav.nombre });
            });
            setTiposEndulzante(optionsTE);

            const optionsTipoTopping = {
                method: 'GET',
                url: 'https://localhost:7276/api/TiposTopping',
                headers: {
                    Authorization: `Beare ${token}`
                }
            };

            const responseTipoTopping = await axios.request(optionsTipoTopping);
            const listadoTipoTopping = responseTipoTopping.data;
            let optionsTT: ((prevState: { value: string; label: string; }[]) => { value: string; label: string; }[]) | { value: any; label: any; }[] = [];
            listadoTipoTopping.forEach((nav: { nombre: any; id: any; }) => {
                optionsTT.push({ value: nav.id, label: nav.nombre });
            });
            setTipoTopping(optionsTT);

        } catch (error) {
            console.error("Error obteniendo tipos de masa:", error);
        }
    };

    useEffect(() => {
        getDatosIniciales();
    }, []);

    interface Product {
        id: number; // Unique identifier for each product
        name: string; // Product name
        variants: string; // Number of variants (e.g., "1 Variant", "2 Variants")
        category: string; // Category of the product
        price: string; // Price of the product (as a string with currency symbol)
        // status: string; // Status of the product
        image: string; // URL or path to the product image
        status: "Delivered" | "Pending" | "Canceled"; // Status of the product
    }
    const tableData: Product[] = [
        {
            id: 1,
            name: "MacBook Pro 13”",
            variants: "2 Variants",
            category: "Laptop",
            price: "$2399.00",
            status: "Delivered",
            image: "/images/product/product-01.jpg", // Replace with actual image URL
        },
        {
            id: 2,
            name: "Apple Watch Ultra",
            variants: "1 Variant",
            category: "Watch",
            price: "$879.00",
            status: "Pending",
            image: "/images/product/product-02.jpg", // Replace with actual image URL
        },
        {
            id: 3,
            name: "iPhone 15 Pro Max",
            variants: "2 Variants",
            category: "SmartPhone",
            price: "$1869.00",
            status: "Delivered",
            image: "/images/product/product-03.jpg", // Replace with actual image URL
        },
        {
            id: 4,
            name: "iPad Pro 3rd Gen",
            variants: "2 Variants",
            category: "Electronics",
            price: "$1699.00",
            status: "Canceled",
            image: "/images/product/product-04.jpg", // Replace with actual image URL
        },
        {
            id: 5,
            name: "AirPods Pro 2nd Gen",
            variants: "1 Variant",
            category: "Accessories",
            price: "$240.00",
            status: "Delivered",
            image: "/images/product/product-05.jpg", // Replace with actual image URL
        },
    ];

    const options = [
        { value: "Tamal", label: "Tamal" },
        { value: "Bebida", label: "Bebida" },
    ];

    const tamanioTamal = [
        { value: "1 und", label: "1 und" },
        { value: "6 und", label: "6 und" },
        { value: "12 und", label: "12 und" },
    ];

    const tamanioBebida = [
        { value: "Vaso 12oz", label: "Vaso 12oz" },
        { value: "Jarro 1L", label: "Jarro 1L" },
    ];

    const handleSelectChangeTipoProducto = (value: string) => {
        if (value == 'Tamal') {
            setFormDataNuevoProducto(prev => ({
                ...prev,
                tipoProducto: "Tamal"
            }));
            setTipoProducto('Tamal');
            setTamanoCantidad(tamanioTamal);
        } else {
            setFormDataNuevoProducto(prev => ({
                ...prev,
                tipoProducto: "Bebida"
            }));
            setTipoProducto('Bebida');
            setTamanoCantidad(tamanioBebida);
        }
    };

    const handleSelectChangeTamañoCantidad = (value: string) => {
        const opcion = tamanoCantidad.find(opt => opt.value == value);

        setFormDataNuevoProducto(prev => ({
            ...prev,
            tamanoCantidad: opcion ? opcion.label : "",
            valorTamanoCantidad: value
        }));
    };

    const handleSelectChangeTipoMasa = (value: string) => {
        const opcion = tipoMasa.find(opt => opt.value == value);

        setFormDataNuevoProducto(prev => ({
            ...prev,
            tipoMasa: opcion ? opcion.label : "",
            valorTipoMasa: value
        }));
    };

    const handleSelectChangeTipoRelleno = (value: string) => {
        const opcion = tipoRelleno.find(opt => opt.value == value);

        setFormDataNuevoProducto(prev => ({
            ...prev,
            tipoRelleno: opcion ? opcion.label : "",
            valorTipoRelleno: value
        }));
    };

    const handleSelectChangeTipoEnvoltura = (value: string) => {
        const opcion = tipoEnvoltura.find(opt => opt.value == value);

        setFormDataNuevoProducto(prev => ({
            ...prev,
            tipoEnvoltura: opcion ? opcion.label : "",
            valorTipoEnvoltura: value
        }));
    };

    const handleSelectChangeNivelPicante = (value: string) => {
        const opcion = nivelPicante.find(opt => opt.value == value);

        setFormDataNuevoProducto(prev => ({
            ...prev,
            nivelPicante: opcion ? opcion.label : "",
            valorNivelPicante: value
        }));
    };

    const handleSelectChangeTipoEndulzante = (value: string) => {
        const opcion = tiposEndulzante.find(opt => opt.value == value);

        console.log(tiposEndulzante);
        console.log(value);
        console.log(opcion);

        setFormDataNuevoProducto(prev => ({
            ...prev,
            tipoEndulzante: opcion ? opcion.label : "",
            valorTipoEndulzante: value
        }));
    };

    const handleSelectChangeTipoTopping = (value: string) => {
        const opcion = tipoTopping.find(opt => opt.value == value);

        setFormDataNuevoProducto(prev => ({
            ...prev,
            tipoTopping: opcion ? opcion.label : "",
            valorTipoTopping: value
        }));
    };

    const abrirModal = () => {
        // setNumeroPaso(1);
        // openModal();
        setMostrarCreacion(true)
    }

    const regresarCerrarModal = () => {
        setMostrarCreacion(false)
    }

    // const siguienteFinalizar = () => {
    //     setNumeroPaso(numeroPaso + 1);
    //     if (numeroPaso == 2) {

    //     }
    // }

    const agregarPreGuardar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nuevoElemento: PreGuardar = {
            id: idLinea,
            tipoProducto: formDataNuevoProducto.tipoProducto,
            valorTipoProducto: formDataNuevoProducto.valorTipoProducto,
            tamanoCantidad: formDataNuevoProducto.tamanoCantidad,
            valorTamanoCantidad: formDataNuevoProducto.valorTamanoCantidad,
            descripcion: formDataNuevoProducto.descripcion,
            precioBase: formDataNuevoProducto.precioBase,

            tipoMasa: formDataNuevoProducto.tipoMasa,
            valorTipoMasa: formDataNuevoProducto.valorTipoMasa,
            tipoRelleno: formDataNuevoProducto.tipoRelleno,
            valorTipoRelleno: formDataNuevoProducto.valorTipoRelleno,
            tipoEnvoltura: formDataNuevoProducto.tipoEnvoltura,
            valorTipoEnvoltura: formDataNuevoProducto.valorTipoEnvoltura,
            nivelPicante: formDataNuevoProducto.nivelPicante,
            valorNivelPicante: formDataNuevoProducto.valorNivelPicante,

            tipoEndulzante: formDataNuevoProducto.tipoEndulzante,
            valorTipoEndulzante: formDataNuevoProducto.valorTipoEndulzante,
            tipoTopping: formDataNuevoProducto.tipoTopping,
            valorTipoTopping: formDataNuevoProducto.valorTipoTopping,

            costoExtra: costoAdicional,
        };
        setIdLinea(idLinea + 1);
        setListadoPreGuardar(prevListado => [...prevListado, nuevoElemento]);
        setCostoAdicional("");
    }

    const handleDelete = async (id: number) => {
        setListadoPreGuardar(prevListado =>
            prevListado.filter(item => item.id !== id)
        );
    }

    return (
        <>
            <PageMeta
                title=""
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Productos" />
            <div className={`space-y-6 ${!mostrarCreacion ? "block" : "hidden"}`}>
                <div
                    className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
                >
                    {/* <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between"></div> */}
                    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        {/* <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                            Productos
                        </h3> */}
                        <div>
                            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                                Productos creados
                            </h3>
                        </div>
                        <div>
                            <button onClick={abrirModal} className="space-x-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                Crear
                            </button>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="space-y-6">
                            <Table>
                                {/* Table Header */}
                                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                                    <TableRow>
                                        <TableCell
                                            isHeader
                                            className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Tipo
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Descripción
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Tamaño
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Precio
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}

                                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {tableData.map((product) => (
                                        <TableRow key={product.id} className="">
                                            <TableCell className="py-3">
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                            {product.name}
                                                        </p>
                                                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                                            {product.variants}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {product.price}
                                            </TableCell>
                                            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {product.category}
                                            </TableCell>
                                            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <Badge
                                                    size="sm"
                                                    color={
                                                        product.status === "Delivered"
                                                            ? "success"
                                                            : product.status === "Pending"
                                                                ? "warning"
                                                                : "error"
                                                    }
                                                >
                                                    {product.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`space-y-6 ${mostrarCreacion ? "block" : "hidden"}`}>
                <div
                    className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
                >
                    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                                Productos creados
                            </h3>
                        </div>

                        <div>
                            <button onClick={regresarCerrarModal} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                Cerrar
                            </button>
                            <button onClick={abrirModal} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                Guardar
                            </button>
                        </div>
                    </div>
                    <form onSubmit={agregarPreGuardar}>
                        <div className="p-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
                            <div className="space-y-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Tipo de producto
                                </label>
                                <Select
                                    options={options}
                                    placeholder="Selecciones un tipo"
                                    onChange={handleSelectChangeTipoProducto}
                                    className="dark:bg-dark-900"
                                />
                            </div>
                            <div className="space-y-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Tamaño/Cantidad
                                </label>
                                <Select
                                    options={tamanoCantidad}
                                    placeholder="Selecciones un tipo"
                                    onChange={handleSelectChangeTamañoCantidad}
                                    className="dark:bg-dark-900"
                                />
                            </div>
                            <div className="space-y-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Descripción
                                </label>
                                <div className="relative">
                                    <Input placeholder="Descripción" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Precio base
                                </label>
                                <div className="relative">
                                    <Input type="number" placeholder="89.23" />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:p-6">
                            <div className="space-y-6">
                                <label className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    Tipo de masa
                                </label>
                                <div className={`relative ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    <Select
                                        options={tipoMasa}
                                        placeholder="Selecciones un tipo"
                                        onChange={handleSelectChangeTipoMasa}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <label className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    Tipo de relleno
                                </label>
                                <div className={`relative ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    <Select
                                        options={tipoRelleno}
                                        placeholder="Selecciones un tipo"
                                        onChange={handleSelectChangeTipoRelleno}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <label className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    Tipo de envoltura
                                </label>
                                <div className={`relative ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    <Select
                                        options={tipoEnvoltura}
                                        placeholder="Selecciones un tipo"
                                        onChange={handleSelectChangeTipoEnvoltura}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <label className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    Nivel de picante
                                </label>
                                <div className={`relative ${tipoProducto == 'Tamal' ? "block" : "hidden"}`}>
                                    <Select
                                        options={nivelPicante}
                                        placeholder="Selecciones un tipo"
                                        onChange={handleSelectChangeNivelPicante}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <label className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${tipoProducto == 'Bebida' ? "block" : "hidden"}`}>
                                    Tipo de endulzante
                                </label>
                                <div className={`relative ${tipoProducto == 'Bebida' ? "block" : "hidden"}`}>
                                    <Select
                                        options={tiposEndulzante}
                                        placeholder="Selecciones un tipo"
                                        onChange={handleSelectChangeTipoEndulzante}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <label className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 ${tipoProducto == 'Bebida' ? "block" : "hidden"}`}>
                                    Tipo de topping
                                </label>
                                <div className={`relative ${tipoProducto == 'Bebida' ? "block" : "hidden"}`}>
                                    <Select
                                        options={tipoTopping}
                                        placeholder="Selecciones un tipo"
                                        onChange={handleSelectChangeTipoTopping}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                                <label className={`mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400`}>
                                    Costo extra
                                </label>
                                <div className={`relative`}>
                                    <Input placeholder="Descripción" value={costoAdicional} onChange={(e) => setCostoAdicional(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <Table>
                                    {/* Table Header */}
                                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                                        <TableRow>
                                            <TableCell
                                                isHeader
                                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Datos
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Costo Extra
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Acciones
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>

                                    {/* Table Body */}

                                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {listadoPreGuardar.map((product) => (
                                            <TableRow key={product.id} className="">
                                                <TableCell className="py-3">
                                                    <div className="flex items-center gap-3">
                                                        {
                                                            product.tipoProducto == "Tamal" ?
                                                                <div>
                                                                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                                        {product.tipoMasa}
                                                                    </p>
                                                                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                                                        {product.tipoRelleno}
                                                                    </span>
                                                                    <br />
                                                                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                                                        {product.tipoEnvoltura}
                                                                    </span>
                                                                    <br />
                                                                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                                                        {product.nivelPicante}
                                                                    </span>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                                        {product.tipoEndulzante}
                                                                    </p>
                                                                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                                                        {product.tipoTopping}
                                                                    </span>
                                                                </div>
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    {product.costoExtra}
                                                </TableCell>
                                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        <Eliminar className="size-7" stroke="red" />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <button type="submit" className="hidden">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
