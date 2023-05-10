import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { Menu } from 'antd'
import { useState } from 'react';
const MenuItems: MenuProps['items'] = [
	{ key: 1, label: (<Link to={'/profile'}>Личный кабинет</Link>)},
	{ key: 2, label: (<Link to={'/projects'}>Лента проектов</Link>)},
	{ key: 3, label: (<Link to={'/my-projects'}>Мои проекты</Link>)},
	{ key: 4, label: (<Link to={'/tasks'}>Задачи</Link>)},
	{ key: 5, label: (<Link to={'/users'}>Список работников</Link>)},
];

export const MenuComponent = () => {
	
	return <Menu style={{ flex: "none", minWidth: 0 }} theme="light" mode="horizontal" items={MenuItems} />;
};
