import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl, normalizeListResponse } from "../lib/api";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const codespaceEndpoint = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
    return codespaceName ? codespaceEndpoint : `${getApiBaseUrl()}/activities/`;
  }, []);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setActivities(normalizeListResponse(payload));
      } catch (fetchError) {
        setError("Unable to load activities.");
      }
    };

    void loadActivities();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id} className="list-group-item d-flex justify-content-between">
            <span>{activity.type || "activity"}</span>
            <span className="text-secondary">{activity.durationMinutes || 0} min</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
