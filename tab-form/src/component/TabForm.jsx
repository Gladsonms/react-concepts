import { useState } from "react";
import Interest from "./Interest";
import Profile from "./Profile";
import Settings from "./Settings";
import "./index.css";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data,setData]=useState({
    name:"gladson",
    age:25,
    email:"gms@yopmail.com",
    interest:["coding","finance"],
    theme:"dark"
  })
  const tabs = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interest",
      component: Interest,
    },
    {
      name: "Settings",
      component: Settings,
    },
  ];
  const ActiveTabComponent = tabs[activeTab].component;

  return (
    <>
      <h1>tab form</h1>
      <div className="tab-header-container">
        {tabs.map((tab, index) => {
          return (
            <div
              className="tab-content"
              key={`${tab.name}`}
              onClick={()=>setActiveTab(index)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="tab-body">
        <ActiveTabComponent data={data} setData={setData}/>
      </div>
    </>
  );
};

export default TabForm;
