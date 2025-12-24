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

export default function SideBySideMobile({
    matrix,
}: {
    matrix: ComparisonMatrix;
}) {
    const rows = [
        { label: "Warranties", key: "warranties" },
        { label: "Exclusions", key: "exclusions" },
        { label: "Subjectivities", key: "subjectivities" },
        { label: "Conditions", key: "conditions" },
    ];

    return (
        <div className="block lg:hidden space-y-6">
            {rows.map(({ label, key }) => {
                const data = matrix[key as keyof ComparisonMatrix];
                if (!data) return null;

                return (
                    <div
                        key={key}
                        className="border border-gray-200 rounded-xl bg-white shadow-sm"
                    >
                        {/* CATEGORY HEADER */}
                        <div className="px-4 py-3 border-b bg-gray-50 font-semibold text-gray-800">
                            {label}
                        </div>

                        {/* PROVIDERS */}
                        <div className="divide-y">
                            {data.map(provider => (
                                <div
                                    key={provider.provider}
                                    className="px-4 py-4"
                                >
                                    <div className="font-medium text-gray-900 mb-2">
                                        {provider.provider}
                                    </div>

                                    {provider.items.length === 0 ? (
                                        <span className="text-sm text-gray-400 italic">
                                            Not specified
                                        </span>
                                    ) : (
                                        <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                            {provider.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
