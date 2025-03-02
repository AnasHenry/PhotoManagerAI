import React from "react";
import './Dashboard.css';
import Card from "../components/Card";
import Sidebar from "./Sidebar";
function Dashboard(){
    return(
        <div className="dmain">
            <Sidebar/>
            <div className="dcenter">
                <div className="topcen">
                    <p>HELLO</p>
                </div>
                <div className="topmidcen">

                </div>
                <div className="bottommidcen">
                    <Card 
                        title="Graph1" 
                        description="makamishi"
                        imageUrl="D:\PhotoManagerAI\src\assets\graph1.jpg"
                    />
                    <Card 
                        title="Graph2" 
                        description="the king of hell"
                        imageUrl="D:\PhotoManagerAI\src\assets\graph2.jpg"
                    />
                </div>
                <div className="bottomcen">
                    <p>okay</p>
                </div>
            </div>
            <div className="dright">
                <div className="toprig">
                    <h2>hi</h2>
                </div>
                <div className="cenrig">
                    <h2>hello</h2>
                </div>
                <div className="botrig">
                    
                </div>
            </div>
        </div>
    );
}
export default Dashboard;