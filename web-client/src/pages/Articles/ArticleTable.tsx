import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../../components/ui/data-table";
import { articleColumn as columns } from "./ArticleColumn";

type PROPS = {
  data: any[];
};

const ArticleTable = ({ data }: PROPS) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border mx-5">
      <DataTable table={table} columnLength={columns.length} />
    </div>
  );
};

export default ArticleTable;
