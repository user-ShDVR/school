import { FC, useState } from 'react';
import { Button, Card, Tabs, Typography, Table, Progress, Modal, Form, Input, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Radar } from '@ant-design/charts';
import { useAppSelector } from '../../redux/hooks';
import { logout, selectUser } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllUserTasksQuery } from '../../redux/api/taskApi';

const { Paragraph } = Typography;

interface DataType {
	id: number;
	name: string;
	progress: number;
	rating: number;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Имя задачи',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Прогноз',
		dataIndex: 'TaskUser',
		key: 'predicted',
		render: (item) => Object.values(item)[0],
	},
	{
		title: 'Экспертная оценка',
		dataIndex: 'TaskUser',
		key: 'rating',
		render: (item) => item.rate.rating === 0 ? <p>Нету</p> : item.rate.rating,
	},

];






export const Profile: FC = (props) => {
	const { user } = useAppSelector(selectUser);
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const [currentVAR, setCurrentVAR] = useState(1);
	const [currentINVAR, setCurrentINVAR] = useState(1);
	const { data: dataVar, isSuccess: isSuccessVar, refetch: refetchVar } = useGetAllUserTasksQuery({ limit: '8', type: 'VAR', page: `${currentVAR}` })
	const { data: dataINVAR, isSuccess: isSuccessINVAR, refetch: refetchINVAR } = useGetAllUserTasksQuery({ limit: '8', type: 'INVAR', page: `${currentINVAR}` })
	const { data, isSuccess, refetch } = useGetAllUserTasksQuery({ limit: '1000', page: '1' })
	const onLogout = () => {
		dispatch(logout())
		navigate('/')
	}
	if (!user) {
		return null;
	}
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

	function onFinish(values) {
		console.log(values)
	}

	return <div style={{ width: "100%", maxWidth: "1024px", height: "100%", padding: "32px 32px", background: "#FFFFFF", borderRadius: "32px", boxShadow: "28px 0px 50.4863px rgba(0, 0, 0, 0.17)", justifyContent: "center" }}>


		<Tabs
			defaultActiveKey="1"
			items={[
				{
					label: 'Информация',
					key: '1',
					children: <Card title={user.name} extra={<><Button onClick={showModal} type="primary">Редактировать</Button> <Button onClick={onLogout} type="dashed">Выйти</Button></>} bordered={true} style={{ width: "100%", marginBottom: "32px" }}>
						<Paragraph>Права пользователя: {user.role}</Paragraph>
						{/* <Paragraph>Должность: </Paragraph> */}
						<Paragraph>О себе: Если ты всегда будешь делать завтрашнюю работу сегодня, то последний день твоей жизни будет совершенно свободным. </Paragraph>
					</Card>,
				},
				{
					label: 'Инвариантные задачи',
					key: '2',
					children: <div> <Table size='middle' columns={columns} dataSource={isSuccessINVAR ? dataINVAR.rows : null} rowKey="id" /> </div>,
				},
				{
					label: 'Вариативные задачи',
					key: '3',
					children: <div> <Table size='middle' columns={columns} dataSource={isSuccessVar ? dataVar.rows : null} rowKey="id" /> </div>,
				},
				{
					label: 'Инвариантная статистика ',
					key: '4',
					children: <>{isSuccess && data.length >= 6 ? <Radar style={{ height: "500px" }} {...config} /> : 'Добавьте больше задач чтобы видеть статистику'}</>,
				},
				{
					label: 'Вариативная статистика',
					key: '5',
					children: <>{isSuccess && data.length >= 6 ? <Radar style={{ height: "500px" }} {...config} /> : 'Добавьте больше задач чтобы видеть статистику'}</>,
				},
			]}
		/>
		<Modal title="Редактирование пользователя" open={isModalOpen} footer={null}
			onCancel={() => setIsModalOpen(false)}>
			<Form
				name="basic"
				style={{ maxWidth: 600 }}
				layout='vertical'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item >
					<Button type="primary" htmlType="submit">
						Подтвердить
					</Button>
				</Form.Item>
			</Form>
		</Modal>




	</div>;

};
