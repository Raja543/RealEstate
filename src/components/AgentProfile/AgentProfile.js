import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, onValue } from "firebase/database";

const AgentProfile = ({ agentId }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentData = () => {
      const db = getDatabase();
      const agentRef = ref(db, `agents/${agentId}`);
      onValue(agentRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAgent(data);
        } else {
          console.log("Agent not found.");
        }
        setLoading(false);
      });
    };

    fetchAgentData();
  }, [agentId]);

  if (loading) {
    return <div>Loading agent data...</div>;
  }

  if (!agent) {
    return <div>Agent not found.</div>;
  }

  return (
    <div className="p-4 border border-gray-200 rounded shadow mr-8">
      <h2 className="text-xl font-bold mb-2">{agent.name}</h2>
      <p className="mb-2">
        Email: <span className="font-medium">{agent.email}</span>
      </p>
      <p className="mb-2">
        Phone: <span className="font-medium">{agent.phone}</span>
      </p>
    </div>
  );
};

AgentProfile.propTypes = {
  agentId: PropTypes.string.isRequired,
};

export default AgentProfile;
