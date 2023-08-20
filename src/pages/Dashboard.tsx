import { useSignOut } from "@nhost/react";

const Dashboard = () => {
  const { signOut } = useSignOut();
  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={signOut}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
