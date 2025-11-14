"use client";

export default function PaymentTable({ payments }: { payments: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-100">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 text-gray-600 font-medium">
                    <tr>
                        <th className="p-3">Sr. No</th>
                        <th className="p-3">Invoice number</th>
                        <th className="p-3">Invoice screenshot</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Access</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {payments.map((p, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="p-3 font-medium">{i + 1}.</td>
                            <td className="p-3 font-semibold text-gray-800">{p.invoice}</td>
                            <td className="p-3 text-teal-700 underline cursor-pointer">
                                {p.image}
                            </td>
                            <td className="p-3">{p.date}</td>
                            <td className="p-3">{p.access}</td>
                            <td className="p-3 flex items-center gap-2">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full ${p.status === "Success" ? "bg-green-500" : "bg-red-500"
                                        }`}
                                ></span>
                                {p.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
