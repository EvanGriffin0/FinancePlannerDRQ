//dashboard page that appears after successfull sign up / login
import pieChart from '../assets/Pie-chart.jpeg';
import barChart from '../assets/bar-chart.jpeg';


//placeholder
const Dashboard = () => {

    const storedUsername = localStorage.getItem('username');
    return <div style={{ textAlign: "center", 
        marginBottom: "20px",
        color: "#333",}}>
        <h1>Griffin Budgeting</h1>
        <p>Welcome Back {storedUsername}</p>    

        <h3 style={{ textAlign: "center",
        color: "#333",}}>Why Choose GriffinBudgeting?</h3>
        <p>We are leading the industry with innovated graphing and budgeting tools</p>
        <p>We help you understand your finances better saving you time and effort</p>
        <p>To get started check out our Update Your Details page to get started!</p>
   
        <div style= {{margin:'10%'}}>
            <img src={pieChart} alt="Example" style={{ maxWidth: '50%', height: 'auto'}}/>
            <img src={barChart} alt="Example" style={{ maxWidth: '50%', height: 'auto'}}/>
                    
        </div>
    </div>;
};

export default Dashboard;