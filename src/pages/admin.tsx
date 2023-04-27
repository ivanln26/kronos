import { trpc } from "@/utils/trpc";

import { useState } from "react";

import Navbar from "@/components/Navbar";

type sideBar = {
    "horarios": boolean,
    "cursos": boolean,
}

export default function admin() {
    const schedules = trpc.schedules.get.useQuery();
    const [sideBar, setSideBar] = useState<sideBar>({
        "horarios": false,
        "cursos": false
    })

    const alterSideBar  = (key: keyof sideBar, value: boolean) => {
        const sideBarTemp: sideBar = { ...sideBar };
        sideBarTemp[key] = value;
        setSideBar(sideBarTemp)
    }

    const attributes = (keys: [], data: []) => {
        return (
            <>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-row">
                <div className=" h-screen mx-5 my-5 w-80 text-center rounded-xl font-black bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
                    <ul className={`py-4 mx-2 divide-solid divide-y`}>
                        <li className="hover:bg-primary-40 hover:text-primary-20 hover:bg-primary-80 hover:duration-500 py-1" onClick={() => alterSideBar("horarios", !sideBar["horarios"])}>Horarios</li>
                        <ul className={`${sideBar["horarios"] ? '' : 'hidden'}`}>
                            {
                                !schedules.isLoading && !schedules.isError &&
                                schedules.data.map((schedule, i) => (
                                    <li key={Number(schedule.id)} onClick={() => { }} className="hover:bg-indigo-500 hover:duration-500 font-light ">
                                        {schedule.course}
                                    </li>
                                ))
                            }
                            <li className="hover:bg-indigo-500 hover:duration-500 font-light">Programación 1</li>
                            <li className="hover:bg-indigo-500 hover:duration-500 font-light">Fisica 3</li>
                        </ul>
                        <li className="hover:bg-primary-40 hover:text-primary-20 hover:bg-primary-80 hover:duration-500 py-1" onClick={() => alterSideBar("cursos", !sideBar["cursos"])}>Cursos</li>
                        <ul className={`${sideBar["cursos"] ? '' : 'hidden'}`}>
                            <li className="hover:bg-indigo-500 hover:duration-500 font-light">ddasda 1</li>
                            <li className="hover:bg-indigo-500 hover:duration-500 font-light">adsa 3</li>
                        </ul>
                    </ul>
                </div>
                <div className="flex text-center w-full bg-gray-500 my-5 rounded-xl mx-5
                    bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]
                    flex-col divide-y divide-solid" >

                    <div>
                        {/* TODO: {attributes(Object.keys(modalData), Object.values(modalData))} */}
                    </div>
                </div>
            </div>
        </>
    )
}