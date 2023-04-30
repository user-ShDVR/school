import { Button, Col, DatePicker, FloatButton, Form, Input, InputNumber, Modal, Pagination, PaginationProps, Row, Select, notification } from "antd";
import { TaskItem } from "../../components/TaskItem";
import { useCreateTaskMutation, useGetAllTasksQuery } from "../../redux/api/taskApi";
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { NotificationPlacement } from "antd/es/notification/interface";
import { toast } from "react-toastify";




export const Tasks = () => {

	const [modalOpen, setModalOpen] = useState(false);
	const [current, setCurrent] = useState(1);
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const { data, isSuccess, refetch } = useGetAllTasksQuery({ limit: '8', page: `${current}` })
	const [createProject, { isError, error }] = useCreateTaskMutation();
	const onChange = (page) => {
		setCurrent(page);
		refetch()
	};
	const onFinishModal = (values: any) => {
		createProject(values)
		setModalOpen(false)
		refetch()
	};

	React.useEffect(() => {
		if (isError) {
			toast.error((error as any).data.message)
		}
	}, [isError])
	return <div style={{ maxWidth: 1024 }}>
		<Row justify="space-around" style={{ width: "100%" }} gutter={[16, 16]}>
			{isSuccess ?
				data.rows.map((item) => {
					return (
						<Col style={{ width: "320px" }} key={item.name} xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }} >
							<TaskItem key={item.id} item={item} refetch={refetch} />
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

					<Form.Item label="Дата окончания:" name="stop" rules={[{ required: true, message: 'Пожалуйста заполните поле!' }]} >
						<DatePicker />
					</Form.Item>

					<Form.Item label="Тип задачи:" name="typ" rules={[{ required: true, message: 'Пожалуйста заполните поле!' }]} >
						<Select
							defaultValue="VAR"
							options={[
								{ value: 'INVAR', label: 'Инвариантная задача' },
								{ value: 'VAR', label: 'Вариативная задача' },
							]}
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
		<Row justify="center" style={{ marginTop: "8px" }}>
			<Pagination defaultPageSize={8} pageSize={8} showSizeChanger={false} current={current} onChange={onChange} total={isSuccess ? data.count : 0} />
		</Row>

	</div>;
};
