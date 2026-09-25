import { ErrorBoundary } from "@/components/ErrorBoundary";
import CoinOverview from "@/components/home/CoinOverview";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/home/fallback";
import TrendingCoins from "@/components/home/TrendingCoins";
import { Suspense } from "react";

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <ErrorBoundary fallback={<CoinOverviewFallback />}>
          <Suspense fallback={<CoinOverviewFallback />}>
            <CoinOverview />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<TrendingCoinsFallback />}>
          <Suspense fallback={<TrendingCoinsFallback />}>
            <TrendingCoins />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="mt-7 w-full space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default Page;
