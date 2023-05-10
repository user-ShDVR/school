import { useState } from "react";
import { Table, InputNumber } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAddRateMutation } from "../../redux/api/taskApi";


const RatingTable = ({ data }) => {
  interface DataType {
    id: any;
    name: string;
    TaskUser: any;
    rating: number;
  }

  const [rate, setRate] = useState<number>(0);
   const [updateUser] = useAddRateMutation();

  const columns: ColumnsType<DataType> = [
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Рейтинг",
      dataIndex: "rating",
      key: "rating",
      render: (_, user) => (
        <InputNumber
          min={0}
          max={100}
          defaultValue={user.TaskUser.rate.rating}
          onChange={(value) => {
            setRate(value);
            updateUser({ userId: user.id, taskId: data.id, rate: rate });
          }}
        />
      ),
    },
  ];


  return <Table dataSource={data.users} columns={columns} />;
};

export default RatingTable;
