'use client'

const ConvidadosList = () => {
    return (
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-8 mt-5">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nome</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Familiares</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Telefone</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Confirmado</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Active</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">Jane Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">janedoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">555-555-5555</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ConvidadosList