import avatar from "../../assets/Avatar.png";
import { Button, Card, Col, Divider, Modal, Row } from 'antd';
import { ProjectTwoTone } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { useState } from "react";
const { Meta } = Card;

export const Item = ({ item }) => {
	const [modalOpen, setModalOpen] = useState(false);
	return <>
		<Card
			style={{ maxWidth: 240 }}
			cover={<ProjectTwoTone style={{ fontSize: '230px', color: '#08c' }} />}
		>
			<Meta title={item.name} />
			Автор: {item.author}<br />
			Квота: {item.workers}<br /><br />
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
			<p>Автор проекта: {item.author}</p>
			<p>Квота людей: {item.workers}</p>
			<p>Средняя оценка экспертов: {item.rating}</p>
			<p>Описание проекта: {item.description}</p>
			тут еще юзеры проекта будут
			<Row gutter={16} justify={"space-between"}>
				<Col flex="auto"><Button style={{ width: "100%" }} type="primary" onClick={() => setModalOpen(true)}>
					Присоединится
				</Button></Col>
				<Col flex="auto"></Col>
				<Col flex="auto" ><Button style={{ width: "100%" }} type="default" onClick={() => setModalOpen(true)}>
					Открыть карточку проекта
				</Button></Col>
			</Row>
		</Modal>
	</>;
};
