import avatar from "../../assets/Avatar.png";
import { Avatar, Button, Card, Col, Divider, InputNumber, List, Modal, Popconfirm, Progress, Row } from 'antd';
import { ProjectTwoTone, UserOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddUserMutation } from "../../redux/api/taskApi";
import Table, { ColumnsType } from "antd/es/table";
const { Meta } = Card;

interface DataType {
	id: number;
	name: string;
	TaskUser: number;
	rating: number;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'ФИО',
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
		render: (item) => Object.values(item)[1] === null ? <p>Нету</p> : Object.values(item)[1],
	},

];

export const TaskItem = ({ item, refetch }) => {
	const [addUser, { isError, error }] = useAddUserMutation();
	const [modalOpen, setModalOpen] = useState(false);
	const [predict, setPredict] = useState< string | number | null>(100);
	const onClick = (contentId: string) => {
		 addUser({ contentId, predict })
		refetch()
	};
	return <>

		<Card
			style={{ width: 240 }}
			cover={<ProjectTwoTone style={{ fontSize: '230px', color: '#08c' }} />}
		>
			<Meta title={item.name} />
			<p>Тип задачи: {item.typ === "INVAR" ? "Инвариантный": "Вариативный"}</p>
			<Button style={{ width: "100%" }} type="primary" onClick={() => setModalOpen(true)}>
				Открыть
			</Button>
		</Card>
		<Modal
			width={1024}
			title={item.name}
			centered
			open={modalOpen}
			footer={null}
			onCancel={() => setModalOpen(false)}
		>
			<Divider />
			<p>Тип задачи: {item.typ}</p>
			<p>Время закрытия задачи: {item.stop}</p>
			<p>Описание задачи: {item.description}</p>
			<p>Пользователи находящиеся в задаче:</p>
			<Table size='small' columns={columns} dataSource={item.users} rowKey="id"/>
			<Row gutter={16} justify={"space-between"}>
				<Col flex="auto">
					<Popconfirm
						title="Последний шаг"
						placement="bottom"
						onConfirm={()=> onClick(item.id)}
						description={<>
						<p>Пожалуйста введите кол-во процентов которое вы выполните от данной задачи!</p>
							<InputNumber
								value={predict}
								onChange={setPredict}
								min={0}
								max={100}
								formatter={(value) => `${value}%`}
							/>
						</>
						}
					>
						<Button style={{ width: "100%" }} type="primary" >
							Присоединится
						</Button>
					</Popconfirm>
				</Col>
				<Col flex="auto"></Col>
				<Col flex="auto" ><Button style={{ width: "100%" }} type="default" onClick={() => setModalOpen(true)}>
					Открыть карточку проекта
				</Button></Col>
			</Row>
		</Modal>
	</>;
};
