import {useState} from "react";

import Table from "./Table"
import TableForm from "./TableForm"

function TableList(props) {
    const [tables, setTables] = useState(props.tables)
    const addTable = (newTable) => {
        setTables([...tables, newTable])
    }

    return (
        <div>
            <li>
                {tables.map((t) =>
                    <Table name={t} games={""}/>
                )}
            </li>
            <TableForm handleClick={addTable}/>
        </div>
    )
}

export default TableList