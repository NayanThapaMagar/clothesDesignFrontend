/* eslint-disable react/jsx-key */
// import { useMemo } from 'react'
import styles from "./contacts.module.css"
import { COLUMNS } from "../../components/tableColumns/contactsColumns"

import { useEffect, useState } from "react"
import { useTable } from "react-table"

import axios from "axios"

export const Contacts = () => {
  const [contacts, setContacts] = useState([])


  useEffect(() => {
    axios.get('http://localhost:5555/listContacts')
      .then((res) => {
        setContacts(res.data.contacts)
      })
      .catch((error) => {
        console.log(error);
        alert('Error! Look console')
      })

  }, [])

  // const columns = useMemo(() => COLUMNS, [])
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const data = useMemo(() => contacts, [])
  // // const columns = useMemo(() => COLUMNS, [])

  const tableInstance = useTable({
    columns: COLUMNS,
    data: contacts
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div className={styles.root}>
      <h1>Contacts</h1>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) =>{
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}
