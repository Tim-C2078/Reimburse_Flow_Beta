import React from "react";
import AnalyticsPage from "./analytics";
import OverviewPage from "./overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardMain = () => {
  return (
    <div>
      <Tabs>
        <TabsList>
          <TabsTrigger className="p-2 w-50 cursor-pointer" value="Overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="p-2 w-50 cursor-pointer" value="Analytics">
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Overview">
          <OverviewPage />
        </TabsContent>
        <TabsContent value="Analytics">
          <AnalyticsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardMain;
