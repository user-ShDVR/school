import avatar from "../../assets/Avatar.png";
import { Avatar, Button, Card, Col, Divider, InputNumber, List, Modal, Popconfirm, Row } from 'antd';
import { ProjectTwoTone, UserOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddUserMutation } from "../../redux/api/taskApi";
const { Meta } = Card;

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
			<Meta title={item.name} /><br /><br />
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
			<p>Описание задачи: {item.description}</p>
			<p>Пользователи находящиеся в задаче:</p>
			<List
				dataSource={item.users}
				renderItem={(item: { id: number, name: string, }, index) => (
					<List.Item>
						<List.Item.Meta
							avatar={
								<Avatar shape="square" icon={<UserOutlined />} />
							}
							title={<a target="_blank" rel="noreferrer" href="mailto:name@gmail.com">{item.name}</a>}
							description="???"
						/>
					</List.Item>
				)}
			/>
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
