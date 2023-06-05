import avatar from "../../assets/Avatar.png";
import { Avatar, Button, Card, Col, Divider, InputNumber, List, Modal, Popconfirm, Row } from 'antd';
import { ProjectTwoTone, UserOutlined } from '@ant-design/icons';
import mainProjectLogo from '../../assets/Проект.png';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddRateMutation, useAddUserMutation, useDeleteProjMutation, useDeleteUserProjMutation } from "../../redux/api/projectsApi";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/userSlice";
const { Meta } = Card;

export const Item = ({ item, refetch }) => {
	const { user } = useAppSelector(selectUser);
	const [addUser, { isError: isErrorUser, error: errorUser }] = useAddUserMutation();
	const [addRate, { isError: isErrorRate, error: errorRate }] = useAddRateMutation();
	const [delProj] = useDeleteProjMutation();
	const [delUserProj] = useDeleteUserProjMutation();
	const [rate, setRate] = useState< string | number | null>(100);
	const [modalOpen, setModalOpen] = useState(false);
	const onClick = (contentId: string) => {
		addUser({contentId})
		.then(()=>{
			refetch()
		})
	};

	const onRateClick = (contestId: string) => {
		addRate({ contestId, rate })
		.then(()=>{
			refetch()
		})
	};
	const onDelete = (id: string) => {
		delProj({id})
			.then(() => {
				refetch()
			})
	};
	const onUserDelete = (userId: number) => {
		delUserProj({userId: userId, contestsId: item.id})
			.then(() => {
				refetch()
			})
	};
	useEffect(() => {
		if (isErrorUser) {
			toast.error((errorUser as any).data.message, {
				position: 'top-right',
			  });
		
		}

	  }, [isErrorUser]);
	  useEffect(() => {
		if (isErrorRate) {
			toast.error((errorRate as any).data.message, {
				position: 'top-right',
			  });
		
		}

	  }, [isErrorRate]);
	  if (!user) {
		return null;
	}

const DeleteUserButton = (id) => {
	return (<>
		{user.role === "ADMIN" ? 
			
				<Popconfirm
					key={id.id}
					title="Удаление"
					placement="bottom"
					onConfirm={() => onUserDelete(id.id)}
					description={<>
						<p>Вы точно хотите удалить этого пользователя?</p>
					</>
					}
				>
					<Button type="link" >Удалить</Button>
				</Popconfirm> 
			 : null}
			</>
	)
}

	return <>

		<Card
			style={{ width: 240 }}
			cover={<img src={mainProjectLogo}/>}
		>
			<Meta title={item.name} />
			Автор: {item.users[0]?.name}<br />
			Квота: {item.users?.length}/{item.workers}<br />
			<Button style={{ width: "100%" }} type="primary" onClick={() => setModalOpen(true)}>
				Открыть
			</Button>{user.role === "ADMIN" ? 
			<>
				<br />
				<br />
				<Popconfirm
					title="Удаление"
					placement="bottom"
					onConfirm={() => onDelete(item.id)}
					description={<>
						<p>Вы точно хотите удалить этот проект?</p>
					</>
					}
				>
					<Button style={{ width: "100%", color: "black" }} type="dashed">
						Удалить
					</Button>
				</Popconfirm> 
			</> : null}
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
			<p>Автор проекта: {item.users[0]?.name}</p>
			<p>Квота людей: {item.users?.length}/{item.workers}</p>
			<p>Средняя оценка экспертов: {item.rating.rating == 0 ? "Нету" : item.rating.rating}</p>
			<p>Описание проекта: <pre>{item.description}</pre></p>
			<p>Пользователи находящиеся в проекте:</p>
			<List
        dataSource={item?.users}
        renderItem={(item: {id: number, name: string, email: string}, index) => (
          <List.Item
		  actions={[<DeleteUserButton id={item.id}/>]}
		  >
			<List.Item.Meta
              avatar={
                <Avatar shape="square" icon={<UserOutlined />} />
              }
              title={item.name}
              description={item.email}
            />
          </List.Item>
        )}
      />
			<Row gutter={16} justify={"space-between"}>
				<Col flex="auto">
				{item.users.length >= item.workers ? <Button style={{ width: "100%" }} disabled type="primary"  onClick={() => onClick(item.id)}>
					Присоединится
				</Button> : <Button style={{ width: "100%" }} type="primary"  onClick={() => onClick(item.id)}>
					Присоединится
				</Button>}
					</Col>
				<Col flex="auto">
					{user.role == 'EXPERT' || user.role == 'ADMIN' ? <Popconfirm
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
					</Popconfirm> : null}
				</Col>
				<Col flex="auto" >
					<Link target="_blank" to={`http://45.12.73.150:5000/${item.fileName}`}><Button style={{ width: "100%" }} type="default" onClick={() => setModalOpen(true)}>
					Открыть карточку проекта
				</Button></Link>
					</Col>
			</Row>
		</Modal>
	</>;
};
