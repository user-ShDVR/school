import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { Menu } from 'antd'
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/features/userSlice';

export const MenuComponent = () => {
let MenuItems: MenuProps['items'];
const { user } = useAppSelector(selectUser);
if (user.role === "ADMIN") {
	MenuItems = [
		{ key: 1, label: (<Link to={'/profile'}>Личный кабинет</Link>)},
		{ key: 2, label: (<Link to={'/projects'}>Лента проектов</Link>)},
		{ key: 3, label: (<Link to={'/my-projects'}>Мои проекты</Link>)},
		{ key: 4, label: (<Link to={'/tasks'}>Задачи</Link>)},
		{ key: 5, label: (<Link to={'/users'}>Список работников</Link>)},
		{ key: 6, label: (<Link to={'/stat'}>Статистика</Link>)},
	];
} else {
	MenuItems = [
		{ key: 1, label: (<Link to={'/profile'}>Личный кабинет</Link>)},
		{ key: 2, label: (<Link to={'/projects'}>Лента проектов</Link>)},
		{ key: 3, label: (<Link to={'/my-projects'}>Мои проекты</Link>)},
		{ key: 4, label: (<Link to={'/tasks'}>Задачи</Link>)},
	];
}
if (!user) {
	return null;
}
	return <Menu style={{ flex: "none", minWidth: 0 }} theme="light" mode="horizontal" items={MenuItems} />;
};
