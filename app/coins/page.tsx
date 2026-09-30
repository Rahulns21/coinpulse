import CoinsPagination from "@/components/CoinsPagination";
import DataTable from "@/components/DataTable";
import { AllCoinsTableFallback } from "@/components/home/fallback";
import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const parsedPage = Number(Array.isArray(page) ? page[0] : page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1;
  const perPage = 10;
  let coinMarketData: CoinMarketData[] = [];

  try {
    coinMarketData = await fetcher<CoinMarketData[]>("/coins/markets", {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page: currentPage,
      sparkline: "false",
      price_change_percentage: "24h",
    });
  } catch (e) {
    console.error("Failed to fetch market data:", e);
    return (
      <main id="coins-page">
        <div className="content">
          <h4>All Coins</h4>
          <AllCoinsTableFallback />
        </div>
      </main>
    );
  }

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label={`View ${coin.name}`} />
        </>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => {
        const isValidImage =
          typeof coin.image === "string" &&
          (coin.image.startsWith("http://") ||
            coin.image.startsWith("https://") ||
            coin.image.startsWith("/"));

        return (
          <div className="token-info">
            <Image
              src={isValidImage ? coin.image : "/assets/placeholder.png"}
              alt={coin.name}
              width={36}
              height={36}
            />
            <p>
              {coin.name} ({coin.symbol.toUpperCase()})
            </p>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const change = coin.price_change_percentage_24h;
        const isTrendingUp = change > 0;
        const isTrendingDown = change < 0;

        return (
          <span
            className={cn("change-value", {
              "text-green-600": isTrendingUp,
              "text-red-500": isTrendingDown,
            })}
          >
            {isTrendingUp && "+"}
            {formatPercentage(change)}
          </span>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => formatCurrency(coin.market_cap),
    },
  ];

  const hasMorePages = coinMarketData.length === perPage;
  const estimatedTotalPages = hasMorePages
    ? currentPage >= 100
      ? Math.ceil(currentPage / 100) * 100 + 100
      : 100
    : currentPage;

  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>

        <DataTable
          tableClassName="coins-table"
          columns={columns}
          data={coinMarketData}
          rowKey={(coin) => coin.id}
        />

        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasMorePages}
        />
      </div>
    </main>
  );
};

export default Page;
