import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, onValue } from "firebase/database";
import { Phone, Mail } from "lucide-react";

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
    <div className="max-w-[350px] bg-[#FFFAE9] shadow-2xl rounded-2xl mx-auto items-center justify-center  p-4 lg:p-8 m-4">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img src={agent.image} alt="Agent" />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold text-2xl">{agent.name}</h2>
        <p className="text-[gray]">{agent.designation}</p>
      </div>
      <div className="flex flex-col">
        <div className="p-1 flex flex-row">
          <Phone size={28} />
          <span className="font-medium text-lg pl-4">{agent.phone}</span>
        </div>
        <div className="p- flex flex-row">
          <Mail size={28} />
          <span className="font-medium text-lg pl-4">{agent.email}</span>
        </div>
      </div>
    </div>
  );
};

AgentProfile.propTypes = {
  agentId: PropTypes.string.isRequired,
};

export default AgentProfile;
