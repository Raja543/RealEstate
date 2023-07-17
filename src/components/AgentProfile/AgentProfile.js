import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import PropTypes from "prop-types";

const AgentProfile = ({ agentId }) => {
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    // Fetch agent data from Firebase based on the agentId
    const fetchAgentData = async () => {
      try {
        const docRef = doc(db, "agents", agentId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists) {
          setAgent(docSnapshot.data());
        } else {
          console.log("Agent not found.");
        }
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };

    fetchAgentData();
  }, [agentId]);

  if (!agent) {
    return <div>Loading agent data...</div>;
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
