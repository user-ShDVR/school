import avatar from "../../assets/Avatar.png";
import { Avatar, Button, Card, Col, Divider, InputNumber, List, Modal, Popconfirm, Row } from 'antd';
import { ProjectTwoTone, UserOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddRateMutation, useAddUserMutation } from "../../redux/api/projectsApi";
import { toast } from "react-toastify";
const { Meta } = Card;

export const Item = ({ item, refetch }) => {
	const [addUser, { isError: isErrorUser, error: errorUser }] = useAddUserMutation();
	const [addRate, { isError: isErrorRate, error: errorRate }] = useAddRateMutation();
	const [rate, setRate] = useState< string | number | null>(100);
	const [modalOpen, setModalOpen] = useState(false);
	const onClick = (contentId: string) => {
		addUser({contentId})
		.then(()=>{
			refetch()
		})
		.catch((errorUser) => {
			toast.error(errorUser.data.message);
		});

	};

	const onRateClick = (contestId: string) => {
		addRate({ contestId, rate })
		.then(()=>{
			refetch()
		})
		.catch((errorRate) => {
			toast.error(errorRate.data.message);
		});
	};

	return <>

		<Card
			style={{ width: 240 }}
			cover={<ProjectTwoTone style={{ fontSize: '230px', color: '#08c' }} />}
		>
			<Meta title={item.name} />
			Автор: {item.users[0].name}<br />
			Квота: {item.users.length}/{item.workers}<br />
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
			<p>Автор проекта: {item.users[0].name}</p>
			<p>Квота людей: {item.users.length}/{item.workers}</p>
			<p>Средняя оценка экспертов: {item.rating.rating == 0 ? "Нету" : item.rating.rating}</p>
			<p>Описание проекта: <pre>{item.description}</pre></p>
			<p>Пользователи находящиеся в проекте:</p>
			<List
        dataSource={item.users}
        renderItem={(item: {id: number, name: string, }, index) => (
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
				<Col flex="auto"><Button style={{ width: "100%" }} type="primary" onClick={() => onClick(item.id)}>
					Присоединится
				</Button></Col>
				<Col flex="auto">
					{<Popconfirm
						title="Последний шаг"
						placement="bottom"
						onConfirm={()=> onRateClick(item.id)}
						description={<>
						<p>Пожалуйста оцените проект!</p>
							<InputNumber
								value={rate}
								onChange={setRate}
								min={0}
								max={100}
								formatter={(value) => `${value}`}
							/>
						</>
						}
					>
						<Button style={{ width: "100%" }} type="primary" >
							Оценить проект
						</Button>
					</Popconfirm>}
				</Col>
				<Col flex="auto" >
					<Link target="_blank" to={`http://localhost:5000/${item.fileName}`}><Button style={{ width: "100%" }} type="default" onClick={() => setModalOpen(true)}>
					Открыть карточку проекта
				</Button></Link>
					</Col>
			</Row>
		</Modal>
	</>;
};
