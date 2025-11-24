import ProviderCard from "./ProviderCard";

export default function SideBySide({ data }: { data: any }) {
    return (
        <div className="space-y-4">
            {data.providers.map((provider: any, index: number) => (
                <ProviderCard
                    key={index}
                    name={provider.name}
                    score={`${provider.score}%`}
                    premium={`SAR ${provider.premium.toLocaleString()}`}
                    rate={provider.rate.replace("‰", "")}
                    active={provider.rank === 1}
                />
            ))}
        </div>
    );
}
