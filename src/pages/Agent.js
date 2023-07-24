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

      <div className="grid grid-cols-2 md:grid-cols-4 p-10">
        {loading ? (
          <div>Loading agents...</div>
        ) : (
          agentIds.map((agentId) => (
            <AgentsProfile key={agentId} agentId={agentId} />
          ))
        )}
      </div>
      <Footer />
      <div className="min-h-screen grid place-items-center bg-indigo-400 font-mono">
        <div className="bg-white h-80 w-64 rounded-md">
          <div className="flex justify-center items-center leading-none">
            <img
              src="https://images.unsplash.com/photo-1585554414787-09b821c321c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="pic"
              className="h-40 w-56 rounded-md shadow-2xl mt-6 transform -translate-y-10 hover:-translate-y-4 transition duration-700"
            />
          </div>
          <div className="p-3">
            <p className="block mb-1 font-extralight">Modelling</p>
            <p className="text-xs tracking-tighter text-gray-600">
              When it is your time, it’s your time. There is no point in
              worrying about what you can’t control.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agent;
