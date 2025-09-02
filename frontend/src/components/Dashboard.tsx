

import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 
export default function Dashboard() {

    const handelSignout =async()=>{
        try {
            await signOut(auth);
            console.log("User signed out successfully");
          } catch (error) {
            console.error("Error signing out:", error);
          }
    }
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <button onClick={handelSignout} className="text-blue-600 text-sm font-medium">Sign Out</button>
      </div>

      {/* Welcome Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="font-bold text-lg">
          Welcome, Jonas Kahnwald !
        </h2>
        <p className="text-gray-600 text-sm">Email: xxxxxx@xxxx.com</p>
      </div>

      {/* Create Note Button */}
      <button className="w-full max-w-md bg-blue-600 text-white font-medium py-2 rounded-md shadow mb-6">
        Create Note
      </button>

      {/* Notes Section */}
      <div className="w-full max-w-md">
        <h3 className="font-semibold text-gray-800 mb-3">Notes</h3>

        {/* Note 1 */}
        <div className="flex justify-between items-center bg-white shadow rounded-md p-3 mb-3">
          <span>Note 1</span>
      
        </div>

        {/* Note 2 */}
        <div className="flex justify-between items-center bg-white shadow rounded-md p-3">
          <span>Note 2</span>
      
        </div>
      </div>
    </div>
  );
}
