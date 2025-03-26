import { useEffect, useState } from "react";
import posthog from "posthog-js";

const AnalyticsContent = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Initialize PostHog (replace YOUR_API_KEY with your actual key)
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "https://app.posthog.com",
    });
    posthog.capture("page_view", { page: "analytics" });

    // Fetch analytics data from our API endpoint
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Sales Performance */}
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl">Sales Performance</h2>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-700 p-4">
            {data ? (
              <p>{data.salesPerformance}</p>
            ) : (
              <p className="text-center text-gray-400">Loading sales data...</p>
            )}
          </div>
        </div>
        {/* User Activity */}
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl">User Activity</h2>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-700 p-4">
            {data ? (
              <p>{data.userActivity}</p>
            ) : (
              <p className="text-center text-gray-400">
                Loading user activity...
              </p>
            )}
          </div>
        </div>
        {/* Top Products */}
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl">Top Products</h2>
          <div className="space-y-2">
            {data && data.topProducts ? (
              data.topProducts.map((product: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <span>{product.name}</span>
                    <span>{product.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Loading top products...
              </p>
            )}
          </div>
        </div>
        {/* Traffic Sources */}
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl">Traffic Sources</h2>
          <div className="space-y-4">
            {data && data.trafficSources ? (
              data.trafficSources.map((source: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <span>{source.name}</span>
                    <span>{source.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-700">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: source.color || "blue",
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Loading traffic data...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
