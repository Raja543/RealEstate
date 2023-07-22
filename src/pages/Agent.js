import React, { useEffect, useState } from "react";
import AgentsProfile from "../components/AgentProfile/AgentProfile";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const Agent = () => {
  const [agentIds, setAgentIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = getDatabase();
    const agentsRef = ref(db, "agents");
    const newAgentRef = push(agentsRef);
    set(newAgentRef, newAgent);

    setNewAgent({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleChange = (e) => {
    setNewAgent({
      ...newAgent,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-4 p-10">
        <div>
          <h2>Add New Agent</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={newAgent.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={newAgent.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={newAgent.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
            <button type="submit">Add Agent</button>
          </form>
        </div>
        {loading ? (
          <div>Loading agents...</div>
        ) : (
          agentIds.map((agentId) => (
            <AgentsProfile key={agentId} agentId={agentId} />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};



export default Agent;
