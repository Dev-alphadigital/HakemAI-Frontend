type MatrixItem = {
    provider: string;
    items: string[];
};

type ComparisonMatrix = {
    warranties?: MatrixItem[];
    exclusions?: MatrixItem[];
    subjectivities?: MatrixItem[];
    conditions?: MatrixItem[];
};

export default function SideBySideTable({
    matrix,
}: {
    matrix: ComparisonMatrix;
}) {
    if (!matrix) return null;

    const providers = matrix.warranties?.map(p => p.provider) || [];

    const rows = [
        { label: "Warranties", key: "warranties" },
        { label: "Exclusions", key: "exclusions" },
        { label: "Subjectivities", key: "subjectivities" },
        { label: "Conditions", key: "conditions" },
    ];

    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                {/* HEADER */}
                <thead className="bg-[#f4f8f6]">
                    <tr>
                        <th className="p-4 text-left text-sm font-semibold text-gray-700 border-r">
                            Category
                        </th>

                        {providers.map(provider => (
                            <th
                                key={provider}
                                className="p-4 text-left text-sm font-semibold text-gray-800 border-r last:border-r-0"
                            >
                                {provider}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {rows.map(({ label, key }, idx) => {
                        const rowData = matrix[key as keyof ComparisonMatrix];
                        if (!rowData) return null;

                        return (
                            <tr
                                key={key}
                                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            >
                                <td className="p-4 font-medium text-gray-800 border-r align-top">
                                    {label}
                                </td>

                                {rowData.map(providerData => (
                                    <td
                                        key={providerData.provider}
                                        className="p-4 border-r last:border-r-0 align-top"
                                    >
                                        {providerData.items.length === 0 ? (
                                            <span className="text-gray-400 italic">
                                                Not specified
                                            </span>
                                        ) : (
                                            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                                {providerData.items.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
