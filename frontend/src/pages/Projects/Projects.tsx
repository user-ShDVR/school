import { Button, Col, FloatButton, Form, Input, InputNumber, Modal, Pagination, PaginationProps, Row, notification } from "antd";
import { Item } from "../../components/Item";
import { useCreateProjectMutation, useGetAllProjectsQuery } from "../../redux/api/projectsApi";
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { NotificationPlacement } from "antd/es/notification/interface";
import { toast } from "react-toastify";




export const Projects = () => {

	const [modalOpen, setModalOpen] = useState(false);
	const [current, setCurrent] = useState(1);
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const { data, isSuccess, refetch } = useGetAllProjectsQuery({ limit: '8', page: `${current}` })
	const [createProject, { isError, error }] = useCreateProjectMutation();
	console.log(data)
	const onChange = (page) => {
		setCurrent(page);
		refetch()
	};
	const onFinishModal = (values: any) => {
		console.log(values)
		createProject(values)
		setModalOpen(false)
		refetch()
	};

	React.useEffect(()=>{
		if (isError) {
		 toast.error((error as any).data.message)
		}
	   },[isError])
	return <div style={{ maxWidth: 1024}}>
		<Row justify="center" gutter={[24, 24]}>
			{isSuccess ?
				data.rows.map((item) => {
					return (
						<Col key={item.name} style={{ display: 'flex', justifyContent: 'center' }} xs={16} sm={12} md={8} lg={6} xl={6} >
							<Item key={item.id} item={item} />
						</Col>
					);
				}) :
				null}

			<FloatButton
				icon={<PlusOutlined />}
				shape="circle"
				tooltip={<div>Создать проект</div>}
				onClick={() => setModalOpen(true)}
			/>
			<Modal
				width={1024}
				title="Создание проекта"
				centered
				open={modalOpen}
				footer={null}
				onCancel={() => setModalOpen(false)}
			>

				<Form
					form={form}
					layout="vertical"
					onFinish={onFinishModal}
				>
					<Form.Item label="Название проекта:" name="name" rules={[{ required: true, message: 'Пожалуйста заполните поле!' }]} >
						<Input />
					</Form.Item>
					<Form.Item label="Квота:" name="workers" rules={[{ required: true, message: 'Пожалуйста заполните поле!' }]} >
						<InputNumber
							min={1}
							max={100}
							formatter={(value) => `0/${value}`}
						/>
					</Form.Item>

					<Form.Item
						label="Описание проекта:"
						name="description"
						rules={[{ required: true, message: 'Пожалуйста заполните поле!' }]}
					>
						<TextArea

							autoSize={{ minRows: 4, maxRows: 8 }}
						/>
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" type="primary">Создать</Button>
					</Form.Item>
				</Form>
			</Modal>
		</Row>
		<Row justify="center" style={{marginTop: "8px"}}>
		<Pagination defaultPageSize={8} pageSize={8} showSizeChanger={false} current={current} onChange={onChange} total={isSuccess ? data.count : 0} />
		</Row>
		
	</div>;
};
