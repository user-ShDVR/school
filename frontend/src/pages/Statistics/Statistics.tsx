import { Radar } from '@ant-design/charts';
import { FC } from 'react';
import { useGetStatTasksQuery } from '../../redux/api/taskApi';

export const Statistics = () => {
	const { data, isSuccess, refetch } = useGetStatTasksQuery({})
	const config = {
		data: data,
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
	
	return <div style={{ width: "100%", maxWidth: "1024px", height: "100%", padding: "32px 32px", background: "#FFFFFF", borderRadius: "32px", boxShadow: "28px 0px 50.4863px rgba(0, 0, 0, 0.17)", justifyContent: "center",  }} >{isSuccess && data.length>=6?<Radar style={{height: "550px"}} {...config} /> : 'Добавьте больше задач чтобы видеть статистику'}</div>;
};
