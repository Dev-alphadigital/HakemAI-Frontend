export default function KeyDifferences({ keyDiffs }: { keyDiffs: any }) {

    const diff = keyDiffs.differences[0];

    return (
        <div className="bg-gray-50 p-6 rounded-xl space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">
                {diff.provider1} vs {diff.provider2}
            </h3>

            <p>Price Difference: SAR {diff.price_difference.toFixed(2)}</p>
            <p>Cheaper: <strong>{diff.cheaper}</strong></p>
            <p>Coverage Difference: {diff.coverage_difference}</p>

            <div className="mt-3 text-[#04786b] font-semibold">
                Recommendation: {keyDiffs.recommendation}
            </div>
        </div>
    );
}
