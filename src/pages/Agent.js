import React, { useEffect, useState } from "react";
import AgentsProfile from "../components/AgentProfile/AgentProfile";
// import firebase from 'firebase/app';
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Agent = () => {
  const [agentIds, setAgentIds] = useState([]);

  //   useEffect(() => {
  //     // Fetch agent IDs from Firebase
  //     const fetchAgentIds = async () => {
  //       try {
  //         const querySnapshot = await firebase.firestore().collection('agents').get();
  //         const ids = querySnapshot.docs.map(doc => doc.id);
  //         setAgentIds(ids);
  //       } catch (error) {
  //         console.error('Error fetching agent IDs:', error);
  //       }
  //     };

  //     fetchAgentIds();
  //   }, []);

  const fetchAgentIds = async () => {
    try {
      const agentSnapshot = await getDocs(collection(db, "agents"));
      const ids = agentSnapshot.docs.map((doc) => doc.id);
      setAgentIds(ids);
    } catch (error) {
      console.error("Error fetching agent IDs:", error);
    }
  };

  useEffect(() => {
    fetchAgentIds();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-4 p-10">
        {agentIds.map((agentId) => (
          <AgentsProfile key={agentId} agentId={agentId} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Agent;
