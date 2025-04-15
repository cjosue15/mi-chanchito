// 'use client';

// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart';
// const chartData = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: 'Desktop',
//     color: 'var(--chart-1)',
//   },
//   mobile: {
//     label: 'Mobile',
//     color: 'var(--chart-2)',
//   },
// } satisfies ChartConfig;

// export function ExpenseLineChart() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Gastos Diarios</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey='month'
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12 }}
//               tickFormatter={(val) => `$${val}`}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Line
//               dataKey='desktop'
//               type='natural'
//               stroke='var(--color-desktop)'
//               strokeWidth={2}
//               dot={{
//                 fill: 'var(--color-desktop)',
//               }}
//               activeDot={{
//                 r: 6,
//               }}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { DailyExpense } from '@/infraestructure/interfaces/transaction/transaction.interface';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
  total: {
    label: 'Gastos',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ExpenseLineChart({ data }: { data: DailyExpense[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos Diarios</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}`; // Solo el día del mes
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(val) => `$${val}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey='total'
              type='natural'
              stroke='var(--chart-1)'
              strokeWidth={2}
              dot={{ fill: 'var(--chart-1)' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
