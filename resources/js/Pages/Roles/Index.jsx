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
                    <table className="w-full divide-y table">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-primary divide-y divide-gray-200">
                        {roles.data.map((role, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {role.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <PrimaryButton className='mr-2' disabled={false}>Show</PrimaryButton>
                                    {
                                        can['role-edit'] &&
                                        <PrimaryButton className='mr-2' onClick={() => router.visit(route('role.edit', {id: role.id}))}>Edit</PrimaryButton>
                                    }
                                    {
                                        can['role-delete'] &&
                                        <PrimaryButton onClick={() => router.delete(route('role.destroy', role.id))}>Delete</PrimaryButton>
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
