import { Card } from "@repo/ui/card";
import { ResponsivePie } from '@nivo/pie';
import { getP2pTransactions } from "../app/lib/actions/getP2pTransactions";
import { useEffect, useState } from 'react';
import React from 'react';

export const PieChart = () => {

  const [pieChartData, setPieChartData] = useState<{
    id: string;
    label: string;
    value: number;
    color: string;
  }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getP2pTransactions();
      setPieChartData(data||[]);
    };
    fetchData();
  }, []);

  return (
    <Card title="Spend Analysis">
      <div style={{ height: '300px' }}> 
        <ResponsivePie
          data={pieChartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
          }}
        />
      </div>
    </Card>
  );
};
