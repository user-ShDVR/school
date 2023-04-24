import { Button, Card, Col, List, Row } from "antd";
import { Item } from "../../components/Item";
import Meta from "antd/es/card/Meta";
import { ProjectTwoTone } from '@ant-design/icons'


const InfoArray = [
	{ id: 1, name: 'Задача 1', author: 1, workers: '1/1', rating: '5.3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat magna ipsum. Duis vel est tellus. Proin rutrum, ipsum a aliquam tempor, metus elit dictum sem, et feugiat nisl sapien eu mauris. Pellentesque et hendrerit diam, convallis fermentum risus. Quisque et elit pellentesque, lobortis nisl ac, aliquam ante. Praesent eu pulvinar tellus. Sed mi neque, imperdiet quis odio sed, convallis varius nibh. Donec sit amet egestas massa, et ultrices massa. Duis tempor quam ac dapibus pellentesque. Duis metus eros, maximus et tempus condimentum, vulputate fringilla velit. Sed elementum risus in libero venenatis, non eleifend est congue. Etiam fermentum augue eget posuere tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat magna ipsum. Duis vel est tellus. Proin rutrum, ipsum a aliquam tempor, metus elit dictum sem, et feugiat nisl sapien eu mauris. Pellentesque et hendrerit diam, convallis fermentum risus. Quisque et elit pellentesque, lobortis nisl ac, aliquam ante. Praesent eu pulvinar tellus. Sed mi neque, imperdiet quis odio sed, convallis varius nibh. Donec sit amet egestas massa, et ultrices massa. ' },
	{ id: 2, name: 'Задача 2', author: 2, workers: '2/2', rating: '5.3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat magna ipsum. Duis vel est tellus. Proin rutrum, ipsum a aliquam tempor, metus elit dictum sem, et feugiat nisl sapien eu mauris. Pellentesque et hendrerit diam, convallis fermentum risus. Quisque et elit pellentesque, lobortis nisl ac, aliquam ante. Praesent eu pulvinar tellus. Sed mi neque, imperdiet quis odio sed, convallis varius nibh. Donec sit amet egestas massa, et ultrices massa. Duis tempor quam ac dapibus pellentesque. Duis metus eros, maximus et tempus condimentum, vulputate fringilla velit. Sed elementum risus in libero venenatis, non eleifend est congue. Etiam fermentum augue eget posuere tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat magna ipsum. Duis vel est tellus. Proin rutrum, ipsum a aliquam tempor, metus elit dictum sem, et feugiat nisl sapien eu mauris. Pellentesque et hendrerit diam, convallis fermentum risus. Quisque et elit pellentesque, lobortis nisl ac, aliquam ante. Praesent eu pulvinar tellus. Sed mi neque, imperdiet quis odio sed, convallis varius nibh. Donec sit amet egestas massa, et ultrices massa. '  },
	
]
export const Tasks = () => {
	return <div >
		<List size="default"
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 8,
      lg: 8,
      xl: 6,
      xxl: 6,
    }}
    dataSource={InfoArray}
    renderItem={(item) => (
      <List.Item style={{ width: "100%" }}>
        <Card  title={item.name}>Card content</Card>
      </List.Item>
    )}
  />
	</div>;
};
