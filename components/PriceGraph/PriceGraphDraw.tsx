"use client";

import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type PriceGraphProps = {
    data: { index: number; price: number }[];
};

const PriceGraphDraw: React.FC<PriceGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 50 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="index"
                    label={{ value: "Index", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                    domain={[980000, 1020000]} // Set Y-axis range for USDC-scaled values
                    tickFormatter={(value) => (value / 1_000_000).toFixed(2)} // Convert to USDC format
                    ticks={[
                        980000,
                        990000,
                        1000000,
                        1010000,
                        1020000,
                    ]} // Fixed increments of 10000
                    label={{
                        value: "Price (USDC)",
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <Tooltip
                    formatter={(value) => [(value as number) / 1_000_000, "Price (USDC)"]}
                    labelFormatter={(label) => `Index: ${label}`}
                />
                <Line type="monotone" dataKey="price" stroke="#8884d8" dot />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PriceGraphDraw;

