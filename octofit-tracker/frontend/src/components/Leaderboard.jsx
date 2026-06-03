import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl, normalizeListResponse } from "../lib/api";

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const codespaceEndpoint = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
    return codespaceName ? codespaceEndpoint : `${getApiBaseUrl()}/leaderboard/`;
  }, []);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setEntries(normalizeListResponse(payload));
      } catch (fetchError) {
        setError("Unable to load leaderboard.");
      }
    };

    void loadLeaderboard();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id || entry.id} className="list-group-item d-flex justify-content-between">
            <span>{entry.user?.name || "Member"}</span>
            <span className="text-secondary">{entry.score ?? 0} pts</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
