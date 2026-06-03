import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl, normalizeListResponse } from "../lib/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const codespaceEndpoint = `https://${codespaceName}-8000.app.github.dev/api/users/`;
    return codespaceName ? codespaceEndpoint : `${getApiBaseUrl()}/users/`;
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setUsers(normalizeListResponse(payload));
      } catch (fetchError) {
        setError("Unable to load users.");
      }
    };

    void loadUsers();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.id || user.email} className="list-group-item d-flex justify-content-between">
            <span>{user.name || "Unknown user"}</span>
            <span className="text-secondary">{user.fitnessLevel || "n/a"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
