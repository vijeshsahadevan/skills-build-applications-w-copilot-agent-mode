import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl, normalizeListResponse } from "../lib/api";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const codespaceEndpoint = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
    return codespaceName ? codespaceEndpoint : `${getApiBaseUrl()}/workouts/`;
  }, []);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(endpoint);
        const payload = await response.json();
        setWorkouts(normalizeListResponse(payload));
      } catch (fetchError) {
        setError("Unable to load workouts.");
      }
    };

    void loadWorkouts();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id || workout.title} className="list-group-item d-flex justify-content-between">
            <span>{workout.title || "Workout"}</span>
            <span className="text-secondary">{workout.durationMinutes || 0} min</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
