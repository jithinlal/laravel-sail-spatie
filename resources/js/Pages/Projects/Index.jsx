import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {router} from '@inertiajs/core'
import TooltipText from "@/Components/TooltipText.jsx";
import Pagination from "@/Components/Pagination.jsx";
import { useState } from "react";
import Dialog from "@/Components/Dialog.jsx";

export default function Index({auth, projects, permissions}) {
    const [deleteProjectId, setDeleteProjectId] = useState(0)

    return (
        <AuthenticatedLayout user={auth.user} permissions={permissions}>
            <Head title="Projects"/>

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-primary flex items-center justify-between p-4 rounded-md">
                    <div className="font-bold">
                        <h1>
                            Projects
                        </h1>
                    </div>
                    {
                        permissions['project-write'] &&
                        <PrimaryButton onClick={() => router.visit(route('projects.create'))}>
                            Create Project
                        </PrimaryButton>
                    }
                </div>

                <div className="overflow-x-auto h-full min-h-screen">
                    <table className="w-full table">
                        <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Detail
                            </th>
                            <th>
                                Preset
                            </th>
                            <th className="flex items-center justify-center">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-primary">
                        {projects.data.map((project, index) => (
                            <tr key={index}>
                                <td>
                                    {project.name}
                                </td>
                                <td>
                                    <TooltipText text={project.detail} limit={50}/>
                                </td>
                                <td>
                                    {project.preset.name}
                                </td>
                                <td>
                                    <div className="hidden md:block">
                                        <ul className="menu menu-horizontal bg-primary rounded-box flex items-center justify-center">
                                            <li>
                                                <a className="tooltip tooltip-top" data-tip="Show">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5"
                                                         stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                    </svg>
                                                </a>
                                            </li>
                                            {
                                                permissions['project-write'] && project.created_by === auth.user.id &&
                                                <li>
                                                    <a className="tooltip tooltip-top" data-tip="Edit"
                                                       onClick={() => router.visit(route('projects.edit', {id: project.id}))}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" strokeWidth="1.5"
                                                             stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                        </svg>

                                                    </a>
                                                </li>
                                            }
                                            {
                                                permissions['project-write'] && project.created_by === auth.user.id &&
                                                <li>
                                                    <a className="tooltip tooltip-top text-error" data-tip="Delete"
                                                       onClick={() => {
                                                           setDeleteProjectId(project.id);
                                                           document.getElementById('project-delete-confirm').showModal()
                                                       }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" strokeWidth="1.5"
                                                             stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                        </svg>
                                                    </a>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                    <div className="block md:hidden">
                                        <div className="dropdown dropdown-left flex items-center justify-center">
                                            <summary tabIndex={0} className="m-1 btn btn-ghost">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/>
                                                </svg>
                                            </summary>
                                            <ul tabIndex={0}
                                                className="shadow menu dropdown-content z-[1] bg-primary rounded-box">
                                                <ul className="menu bg-primary rounded-box">
                                                    <li>
                                                        <a className="tooltip tooltip-right" data-tip="Show">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    {
                                                        permissions['project-write'] && project.created_by === auth.user.id &&
                                                        <li>
                                                            <a className="tooltip tooltip-right" data-tip="Edit"
                                                               onClick={() => router.visit(route('projects.edit', {id: project.id}))}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth="1.5"
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                                </svg>

                                                            </a>
                                                        </li>
                                                    }
                                                    {
                                                        permissions['project-write'] && project.created_by === auth.user.id &&
                                                        <li>
                                                            <a className="tooltip tooltip-right" data-tip="Delete"
                                                               onClick={() => {
                                                                   setDeleteProjectId(project.id);
                                                                   document.getElementById('project-delete-confirm').showModal()
                                                               }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth="1.5"
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                                </svg>
                                                            </a>
                                                        </li>
                                                    }
                                                </ul>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Dialog id={deleteProjectId} modelId="project-delete-confirm" routePath="projects.destroy"/>
                    <div className="flex justify-center align-items">
                        <Pagination
                            className="mt-5"
                            currentPage={projects.current_page}
                            prevPageUrl={projects.prev_page_url}
                            nextPageUrl={projects.next_page_url}
                            totalPages={projects.last_page}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
