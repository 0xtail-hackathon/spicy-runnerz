import { useEffect, useState } from "react";

interface Transaction {
    hash: string;
    from: string;
    to: string | null;
    value: string;
    gasUsed: string;
    timestamp: string;
}

interface TransactionHistoryProps {
    address: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ address }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/transactions?address=${address}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch transaction history.");
                }
                const data: Transaction[] = await response.json();
                setTransactions(data);
            } catch (error: never) {
                setError(error.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [address]);

    if (loading) {
        return <p>Loading transaction history...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul className="space-y-4">
                    {transactions.map((tx) => (
                        <li key={tx.hash} className="bg-gray-100 p-4 rounded shadow">
                            <p>
                                <strong>Hash:</strong> {tx.hash}
                            </p>
                            <p>
                                <strong>From:</strong> {tx.from}
                            </p>
                            <p>
                                <strong>To:</strong> {tx.to || "Contract Creation"}
                            </p>
                            <p>
                                <strong>Value:</strong> {tx.value} ETH
                            </p>
                            <p>
                                <strong>Gas Used:</strong> {tx.gasUsed}
                            </p>
                            <p>
                                <strong>Timestamp:</strong> {tx.timestamp}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionHistory;
