/* eslint-disable react/jsx-key */
// import { useMemo } from 'react'
import styles from "./contacts.module.css"
import { useNavigate } from "react-router-dom"
import { COLUMNS } from "../../components/tableColumns/contactsColumns"

import { useEffect, useState } from "react"
import { useTable } from "react-table"

import FadeLoader from "react-spinners/FadeLoader";

import axios from "axios"

export const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/listContacts')
      .then((res) => {
        setLoading(false);
        setContacts(res.data.contacts)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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

  const handleSaveMail = () => {
    setLoading(true);
    // Extracting Emails to mailList
    const mailList = contacts.map(contact => contact.Email);
    const data = {
      mailList
    };
    axios.post('http://localhost:5555/sendBulkMail', data)
      .then(() => {
        setLoading(false);
        navigate('/contacts');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Error! Look console')
      })
  }

  const override = {
    display: "block",
    margin: "300px",
  };

  return (
    <div className={styles.root}>
      {
        loading ? <FadeLoader
          color={'#0ea6e9'}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> : <>
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
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })
                }

              </tbody>
            </table>
          </div>
          <button className={styles.button} onClick={handleSaveMail}>Send Mail</button>
        </>
      }

    </div>
  )
}
