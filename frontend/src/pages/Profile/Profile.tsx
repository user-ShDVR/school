import { FC } from 'react';
import { Button, Card, Tabs, Typography, Table, Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Radar } from '@ant-design/charts';
import { useAppSelector } from '../../redux/hooks';
import { logout, selectUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const {Paragraph} = Typography;

interface DataType {
	id: number;
	name: string;
	progress: number;
	rating: number;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Название',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Прогресс',
		dataIndex: 'progress',
		key: 'progress',
		render: (text) => <Progress percent={text} size={[100,5]}/>,
	},
	{
		title: 'Оценка',
		dataIndex: 'rating',
		key: 'rating',
		render: (text) => <span>{text}/10</span>,
	},

];

const data: DataType[] = [
	{
		id: 1,
		name: 'Задача 1',
		progress: 70,
		rating: 7,
	},
	{
		id: 2,
		name: 'Задача 2',
		progress: 70,
		rating: 7,
	},
	{
		id: 3,
		name: 'Задача 3',
		progress: 70,
		rating: 7,
	},
	{
		id: 4,
		name: 'Задача 4',
		progress: 70,
		rating: 7,
	},
	{
		id: 5,
		name: 'Задача 5',
		progress: 70,
		rating: 7,
	},
	{
		id: 6,
		name: 'Задача 6',
		progress: 100,
		rating: 7,
	},
	{
		id: 7,
		name: 'Задача 7',
		progress: 70,
		rating: 7,
	},
	{
		id: 8,
		name: 'Задача 8',
		progress: 70,
		rating: 7,
	},
	{
		id: 9,
		name: 'Задача 9',
		progress: 70,
		rating: 7,
	},
	{
		id: 10,
		name: 'Задача 10',
		progress: 70,
		rating: 7,
	},
	{
		id: 11,
		name: 'Задача 11',
		progress: 70,
		rating: 7,
	},
	{
		id: 12,
		name: 'Задача 12',
		progress: 70,
		rating: 7,
	},
];
const data1 = [
	{
	  "item": "Задача 1",
	  "user": "Обязательства",
	  "score": 70
	},
	{
	  "item": "Задача 1",
	  "user": "Фактическое исполнение",
	  "score": 30
	},
	{
	  "item": "Задача 2",
	  "user": "Обязательства",
	  "score": 60
	},
	{
	  "item": "Задача 2",
	  "user": "Фактическое исполнение",
	  "score": 70
	},
	{
	  "item": "Задача 3",
	  "user": "Обязательства",
	  "score": 50
	},
	{
	  "item": "Задача 3",
	  "user": "Фактическое исполнение",
	  "score": 60
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


export const Profile: FC = (props) => {
	const { user } = useAppSelector(selectUser);
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const onLogout = () => {
		dispatch(logout())
		navigate('/')
	}
	if (!user) {
		return null;
	}

	return <div style={{ width: "100%", maxWidth: "1024px", height: "100%", padding: "32px 32px", background: "#FFFFFF", borderRadius: "32px", boxShadow: "28px 0px 50.4863px rgba(0, 0, 0, 0.17)", justifyContent: "center" }}>


		<Tabs
			defaultActiveKey="1"
			items={[
				{
					label: 'Информация',
					key: '1',
					children: <Card title={user.name} extra={<><Button type="primary">Редактировать</Button> <Button onClick={onLogout} type="dashed">Выйти</Button></>} bordered={true} style={{ width: "100%", marginBottom: "32px" }}>
						<Paragraph>Права пользователя: {user.role}</Paragraph>
						{/* <Paragraph>Должность: </Paragraph> */}
						<Paragraph>О себе: Если ты всегда будешь делать завтрашнюю работу сегодня, то последний день твоей жизни будет совершенно свободным. </Paragraph>
					</Card>,
				},
				{
					label: 'Инвариантные задачи',
					key: '2',
					children: <div> <Table size='middle' columns={columns} dataSource={data} rowKey="id" /> </div>,
				},
				{
					label: 'Вариативные задачи',
					key: '3',
					children: <div> <Table size='middle' columns={columns} dataSource={data} rowKey="id"/> </div>,
				},
				{
					label: 'Статистика',
					key: '4',
					children: <Radar style={{height: "600px"}} {...config} />,
				},
			]}
		/>





	</div>;

};
