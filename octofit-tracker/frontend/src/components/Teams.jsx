import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl, normalizeListResponse } from "../lib/api";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const codespaceEndpoint = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
    return codespaceName ? codespaceEndpoint : `${getApiBaseUrl()}/teams/`;
  }, []);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setTeams(normalizeListResponse(payload));
      } catch (fetchError) {
        setError("Unable to load teams.");
      }
    };

    void loadTeams();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id || team.name} className="list-group-item d-flex justify-content-between">
            <span>{team.name || "Unnamed team"}</span>
            <span className="text-secondary">{team.city || "n/a"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
