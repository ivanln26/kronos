import { trpc } from "@/utils/trpc";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";

type sideBar = {
    "schedule": boolean,
    "course": boolean,
    "classroom": boolean,
    "teacher": boolean,
    "enrollment": boolean,
    "attendance": boolean,
    "lecture": boolean,
}

export default function admin() {
    const [editModelData, setEditModelData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sideBar, setSideBar] = useState<sideBar>({
        "schedule": false,
        "course": false,
        "classroom": false,
        "teacher": false,
        "enrollment": false,
        "attendance": false,
        "lecture": false,
    })

    const models = {
        "classroom": trpc.classrooms.get.useQuery(),
        "schedule": trpc.schedules.get.useQuery(),
        "teacher": trpc.users.getTeachers.useQuery(),
        "course": trpc.courses.get.useQuery(),
        "enrollment": trpc.enrollment.get.useQuery(),
        "attendance": trpc.attendance.get.useQuery(),
        "lecture": trpc.lecture.getAll.useQuery()
    }

    const mutation = trpc.schedules.mutate.useMutation();

    const saveChanges = () => {
        handleOpenModal()
        mutation.mutate({ ...editModelData });
    }

    const alterSideBar = (key: keyof sideBar, value: boolean) => {
        const sideBarTemp: sideBar = { ...sideBar };
        sideBarTemp[key] = value;
        setSideBar(sideBarTemp)
    }

    const handleModelDataChange = (key: string, value: any) => {
        const aux = { ...editModelData }
        aux[key] = value;
        setEditModelData({ ...aux })
    }

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const attributes = (obj: object) => {
        const items = [];
        for (let key in obj) {
            if (key === "id") continue;
            else if (key in models) {
                items.push(
                    <div key={key} className="columns-2 xs:colums-1 py-5 mx-4">
                        <p className="text-left w-40">{key}</p>
                        <select className="text-black" name={key} defaultValue={Number(obj[key])}>
                            {models[key].data?.map((m, i) => (
                                <option key={Number(m.id)} value={Number(m.id)}>{m.name ? m.name : Number(m.id)}</option>
                            ))}
                        </select>
                    </div>
                )
                continue;
            }
            items.push(
                <div key={key} className="columns-2 xs:colums-1 py-5 mx-4">
                    <p className="text-left w-40">{key}</p>
                    <input
                        onChange={(e) => { handleModelDataChange(key, e.target.value) }}
                        className="w-full rounded text-black p-2"
                        type="text"
                        value={obj[key]}
                    />  {/* Fack */}
                </div>
            )
        }
        return (
            <div className="flex flex-col">
                {items}
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <Modal onClose={handleCloseModal} isOpen={isModalOpen} >
                <div className="flex flex-col justify-center text-center mt-5 ml-5 mr-5">
                    <h1 className="text-black">Estado de la transacción</h1>
                    {!mutation.isSuccess ?
                        <div className="m-5 text-black">
                            <h2>Espere unos instantes.</h2>
                            <Spinner width={"75"} height={"75"} />
                        </div>
                        :

                        <div className="m-5 text-black">
                            <p>Transacción completada con exito</p>
                            <button onClick={() => handleCloseModal()} className="bg-red-600 text-white border rounded-lg px-4 py-2 mt-5">Cerrar</button>
                        </div>
                    }
                </div>
            </Modal>
            <div className="flex flex-row h-full">
                <div className=" flex-none h-screen mx-5 my-5 w-80 text-center rounded-xl font-black 
                bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
                    <ul className={`py-4 mx-2 divide-solid divide-y`}>
                        {
                            Object.keys(models).map((model, i) => (
                                <div key={i}>
                                    <li className="hover:bg-primary-40 hover:text-primary-20 hover:bg-primary-80 hover:duration-500 py-1" onClick={() => alterSideBar(model, !sideBar[model])}>{model}</li>
                                    <ul className={`${sideBar[model] ? '' : 'hidden'}`}>
                                        {
                                            models[model].data &&
                                            models[model].data.map((obj, i) => (
                                                <li key={Number(obj.id)} onClick={() => { setEditModelData({ ...obj }) }} className="hover:bg-indigo-500 hover:duration-500 font-light ">
                                                    {Number(obj.id)}{obj.name && " | "+ obj.name}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </ul>
                </div>
                {
                    Object.keys(editModelData).length !== 0 &&
                    <div className=" h-full flex text-center w-screen bg-gray-500 my-5 rounded-xl
                    bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]
                    flex-col" >

                        <div>
                            {attributes(editModelData)}
                        </div>
                        <div className="flex flex-row justify-around my-4 mx-4">
                            <button className="bg-red-400 rounded-lg w-20 h-10" onClick={() => setEditModelData({})}>Cancelar</button>
                            <button className="bg-green-400 rounded-lg w-20 h-10" onClick={() => saveChanges()}>Guardar</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}