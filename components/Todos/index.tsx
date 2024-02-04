import React from "react";
import Table from "./Table";
import { listTodosAppsync } from "@/actions/appsync.actions";
import { useUserStore } from "@/store/userStore";
import useSWR from "swr";

const Todos = () => {
  const { sub } = useUserStore();
  const { data: todos, error } = useSWR(sub ? ["todos", sub] : null, () =>
    listTodosAppsync(sub as string)
  ) as any;

  if (!sub) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error occurred while fetching todos</div>;
  }

  if (!todos || todos.length === 0) {
    return <h4 className="text-center mt-5">Create Todo's</h4>;
  }

  return (
    <div>
      <Table data={todos as any} />
    </div>
  );
};

export default Todos;
