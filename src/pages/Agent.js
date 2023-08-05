import React, { useEffect, useState } from "react";
import AgentsProfile from "../components/AgentProfile/AgentProfile";
import { getDatabase, ref, onValue } from "firebase/database";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Agent = () => {
  const [agentIds, setAgentIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgentIds = () => {
    const db = getDatabase();
    const agentsRef = ref(db, "agents");
    onValue(agentsRef, (snapshot) => {
      const data = snapshot.val();
      const ids = data ? Object.keys(data) : [];
      setAgentIds(ids);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAgentIds();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-10 pt-4 pb-20 bg-[#f7f1dd]">
        <h1 className="text-center text-3xl font-bold m-4 capitalize">
          Meet our Real Estate agents
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-2 mx-12 items-center justify-center">
          {loading ? (
            <div>Loading agents...</div>
          ) : (
            agentIds.map((agentId) => (
              <AgentsProfile key={agentId} agentId={agentId} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Agent;
