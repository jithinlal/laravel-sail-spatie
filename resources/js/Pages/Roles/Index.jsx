import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {router} from '@inertiajs/core'

export default function Index({auth, can, roles}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Roles"/>

            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-primary flex items-center justify-between p-4 rounded-md">
                    <div className="font-bold">
                        <h1>
                            Roles
                        </h1>
                    </div>
                    {
                        can['role-create'] &&
                        <PrimaryButton onClick={() => router.visit(route('roles.create'))}>
                            Create Role
                        </PrimaryButton>
                    }
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-primary">
                        {roles.data.map((role, index) => (
                            <tr key={index}>
                                <td>
                                    {role.name}
                                </td>
                                <td>
                                    <PrimaryButton className='mr-2'>Show</PrimaryButton>
                                    {
                                        can['role-edit'] &&
                                        <PrimaryButton className='mr-2' onClick={() => router.visit(route('roles.edit', {id: role.id}))}>Edit</PrimaryButton>
                                    }
                                    {
                                        can['role-delete'] &&
                                        <PrimaryButton onClick={() => router.delete(route('roles.destroy', role.id))}>Delete</PrimaryButton>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
