import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString();
      if (!id) return;

      setIsNew(false);
      const response = await fetch(`http://localhost:5050/record/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }

      const record = await response.json();
      if (!record) {
        navigate("/");
        return;
      }
      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };

    try {
      const response = await fetch(
        isNew ? "http://localhost:5050/record" : `http://localhost:5050/record/${params.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding or updating a record:", error);
    } finally {
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    }
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{isNew ? "Create Employee" : "Update Employee"}</p>
          <h1>{isNew ? "New Employee Record" : "Edit Employee Record"}</h1>
        </div>
      </div>

      <form onSubmit={onSubmit} className="form-card">
        <div className="form-grid">
          <div className="form-intro">
            <h2>Employee Info</h2>
            <p>Enter accurate employee details so the team roster stays up to date.</p>
          </div>

          <div className="form-fields">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="First Last"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label htmlFor="position">Position</label>
              <input
                id="position"
                type="text"
                placeholder="Developer Advocate"
                value={form.position}
                onChange={(e) => updateForm({ position: e.target.value })}
              />
            </div>

            <fieldset className="radio-group">
              <legend>Level</legend>
              <div className="radio-options">
                {['Intern', 'Junior', 'Senior'].map((levelOption) => (
                  <label key={levelOption} className="radio-label">
                    <input
                      type="radio"
                      name="positionOptions"
                      value={levelOption}
                      checked={form.level === levelOption}
                      onChange={(e) => updateForm({ level: e.target.value })}
                    />
                    {levelOption}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button-primary">
            Save Employee Record
          </button>
        </div>
      </form>
    </section>
  );
}