import { trpc } from "@/utils/trpc";

import { useState } from "react";

import Navbar from "@/components/Navbar";

type sideBar = {
    "horarios": boolean,
    "cursos": boolean,
}

export default function admin() {
    const [editData, setEditData] = useState({});
    const [sideBar, setSideBar] = useState<sideBar>({
        "horarios": false,
        "cursos": false
    })

    const schedules = trpc.schedules.get.useQuery();
    const mutation = trpc.schedules.mutate.useMutation();

    
    const saveChanges = () => {
        const res = mutation.mutate({...editData});
        schedules.refetch()
    }


    const alterSideBar = (key: keyof sideBar, value: boolean) => {
        const sideBarTemp: sideBar = { ...sideBar };
        sideBarTemp[key] = value;
        setSideBar(sideBarTemp)
    }

    const handleDataChange = (key: string, value: any) => {
        const aux = {...editData}
        aux[key] = value;
        setEditData({...aux})
    }

    const attributes = (obj: object) => {
        const items = [];
        for (let key in obj) {
            if (key === "id") continue;
            items.push(
                <div key={key} className="columns-2 xs:colums-1 py-5 mx-4">
                    {/* Key repetida (?) */}
                    <p className="text-left w-40">{key}</p> <input onChange={(e) => {handleDataChange(key, e.target.value)}} className="w-full rounded text-black p-2" type="text" value={obj[key]} />  {/* Fack */}
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
            <div className="flex flex-row h-full">
                <div className=" flex-none h-screen mx-5 my-5 w-80 text-center rounded-xl font-black 
                bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
                    <ul className={`py-4 mx-2 divide-solid divide-y`}>
                        <li className="hover:bg-primary-40 hover:text-primary-20 hover:bg-primary-80 hover:duration-500 py-1" onClick={() => alterSideBar("horarios", !sideBar["horarios"])}>Horarios</li>
                        <ul className={`${sideBar["horarios"] ? '' : 'hidden'}`}>
                            {
                                !schedules.isLoading && !schedules.isError &&
                                schedules.data.map((schedule, i) => (
                                    <li key={Number(schedule.id)} onClick={() => { setEditData({ ...schedule }) }} className="hover:bg-indigo-500 hover:duration-500 font-light ">
                                        {schedule.course}
                                    </li>
                                ))
                            }
                        </ul>
                        <li className="hover:bg-primary-40 hover:text-primary-20 hover:bg-primary-80 hover:duration-500 py-1" onClick={() => alterSideBar("cursos", !sideBar["cursos"])}>Cursos</li>
                        <ul className={`${sideBar["cursos"] ? '' : 'hidden'}`}>
                            <li className="hover:bg-indigo-500 hover:duration-500 font-light">ddasda 1</li>
                            <li className="hover:bg-indigo-500 hover:duration-500 font-light">adsa 3</li>
                        </ul>
                    </ul>
                </div>
                {
                    Object.keys(editData).length !== 0 &&
                    <div className=" h-full flex text-center w-screen bg-gray-500 my-5 rounded-xl
                    bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]
                    flex-col" >

                        <div>
                            {attributes(editData)}
                        </div>
                        <div className="flex flex-row justify-around my-4 mx-4">
                            <button className="bg-red-400 rounded-lg w-20 h-10" onClick={() => setEditData({})}>Cancelar</button>
                            <button className="bg-green-400 rounded-lg w-20 h-10" onClick={() => saveChanges()}>Guardar</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}