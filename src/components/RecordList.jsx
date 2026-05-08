import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = ({ record, deleteRecord }) => (
  <tr className="record-row">
    <td>{record.name}</td>
    <td>{record.position}</td>
    <td>{record.level}</td>
    <td>
      <div className="action-row">
        <Link className="button button-secondary" to={`/edit/${record._id}`}>
          Edit
        </Link>
        <button className="button button-danger" type="button" onClick={() => deleteRecord(record._id)}>
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, [records.length]);

  async function deleteRecord(id) {
    const response = await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error(`Failed to delete record: ${response.statusText}`);
      return;
    }

    setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Employee Records</p>
          <h1>Team directory</h1>
        </div>
        <p className="panel-note">Browse and manage employee records from one polished dashboard.</p>
      </div>

      <div className="table-card">
        <div className="table-wrapper">
          <table className="record-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{records.map((record) => <Record key={record._id} record={record} deleteRecord={deleteRecord} />)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}