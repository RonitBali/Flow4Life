import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import img from "../../assets/blood.png";
import MiniCard from "@components/components/ui/Mini-Card";
import Donate from "../../assets/donate.png";
import Request from "../../assets/request.png";
import Card from "@components/components/ui/Card";
import { Button } from './../components/ui/button'
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const donationRequests = [
    { name: "yash", location: "ManavRAchna", bloodGroup: "a" },
    { name: "yash", location: "ManavRAchna", bloodGroup: "a" },
    { name: "yash", location: "ManavRAchna", bloodGroup: "a" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("user successfully signed out");
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-4">
      <div>
        <div className="flex justify-left items-center text-black rounded-br-2xl rounded-bl-2xl">
          {img && <img src={img} alt="logo" className="w-20 h-21" />}
          <h1 className="text-4xl text-left font-bold">Flow4Life</h1>
        </div>
        <div className="text-left text-xl">
          <h2 className="font-light">WELCOME</h2>
          {user && (
            <>
              <h2 className="text-bold text-2xl">{user.displayName}</h2>
              <p>{user.email}</p>
            </>
          )}
          <div className="flex flex-col md:flex-row gap-7 items-center justify-center p-4">
            <MiniCard img={Donate} name={"Donate"} path={"/donationform" }/>
            <MiniCard img={Request} name={"Find Donor"} />
          </div>
          <div>
            <h1 className="p-4">DONATION REQUEST</h1>
            <div className="flex overflow-x-scroll gap-4 p-4">
              {donationRequests.map((prop, index) => (
                <Card
                  key={index}
                  name={prop.name}
                  location={prop.location}
                  bloodGroup={prop.bloodGroup}
                />
              ))}
            </div>
            <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">Logout</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
