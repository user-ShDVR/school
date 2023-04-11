import { Radar } from '@ant-design/charts';
import { FC } from 'react';
import { StatisticsProps } from '.';

const data1 = [
	{
	  "item": "Показатель 1",
	  "user": "Обязательства",
	  "score": 70
	},
	{
	  "item": "Показатель 1",
	  "user": "Фактическое исполнение",
	  "score": 30
	},
	{
	  "item": "Показатель 2",
	  "user": "Обязательства",
	  "score": 60
	},
	{
	  "item": "Показатель 2",
	  "user": "Фактическое исполнение",
	  "score": 70
	},
	{
	  "item": "Показатель 3",
	  "user": "Обязательства",
	  "score": 50
	},
	{
	  "item": "Показатель 3",
	  "user": "Фактическое исполнение",
	  "score": 60
	},
	{
	  "item": "Показатель 4",
	  "user": "Обязательства",
	  "score": 40
	},
	{
	  "item": "Показатель 4",
	  "user": "Фактическое исполнение",
	  "score": 50
	},
	{
	  "item": "Показатель 5",
	  "user": "Обязательства",
	  "score": 60
	},
	{
	  "item": "Показатель 5",
	  "user": "Фактическое исполнение",
	  "score": 70
	},
	{
	  "item": "Показатель 6",
	  "user": "Обязательства",
	  "score": 70
	},
	{
	  "item": "Показатель 6",
	  "user": "Фактическое исполнение",
	  "score": 50
	},
	{
	  "item": "Показатель 7",
	  "user": "Обязательства",
	  "score": 50
	},
	{
	  "item": "Показатель 7",
	  "user": "Фактическое исполнение",
	  "score": 40
	},
  ]
const config = {
    data: data1,
    xField: 'item',
    yField: 'score',
    seriesField: 'user',
    meta: {
      score: {
        alias: '123',
        min: 0,
        max: 100,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    },
    point: {
      size: 3,
    },
  };

export const Statistics: FC<StatisticsProps> = (props) => {
	return <div {...props}><Radar style={{height: "600px"}} {...config} /></div>;
};
