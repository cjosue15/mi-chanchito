'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/useMobile';
import { CategoryTotal } from '@/infraestructure/interfaces/category/category.interface';
import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

interface ExpensePieChartProps {
  categories: CategoryTotal[];
  isLoading?: boolean;
}

export function ExpensePieChart({
  categories,
  isLoading,
}: ExpensePieChartProps) {
  const isMobile = useIsMobile();

  const total = useMemo(() => {
    return categories?.reduce((acc, item) => acc + Number(item.total), 0) || 0;
  }, [categories]);

  const chartData = useMemo(() => {
    if (!categories) return [];

    return categories.map((item) => ({
      name: item.name,
      value: Number(item.total),
      fill: item.color,
    }));
  }, [categories]);

  const chartConfig: ChartConfig = useMemo(() => {
    const config: ChartConfig = {};

    categories?.forEach((item) => {
      config[item.name] = {
        label: item.name,
        color: item.color,
      };
    });

    return config;
  }, [categories]);

  if (isLoading) return <div className='p-4'>Cargando...</div>;

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Gastos por Categoría</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[400px] md:min-w-[600px] pb-0 [&_.recharts-pie-label-text]:fill-foreground'
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey='value'
              innerRadius={isMobile ? 80 : 100}
              strokeWidth={5}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              nameKey='name'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-black text-3xl font-bold'
                        >
                          S/ {total.toFixed(2)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-black'
                        >
                          Gastos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ExpensePieChart;
