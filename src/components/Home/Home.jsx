import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import img from "../../assets/blood.png";
import MiniCard from "@components/components/ui/Mini-Card";
import Donate from "../../assets/donate.png";
import Request from "../../assets/request.png";
import Card from "@components/components/ui/Card";
function Home() {
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

  return (
    <section>
      <div>
        <div className="flex justify-left items-center p-4 text-black rounded-br-2xl rounded-bl-2xl">
          {img && <img src={img} alt="logo" className="w-20 h-21" />}
          <h1 className="text-4xl text-left font-bold">Flow4Life</h1>
        </div>
        <div className="text-left text-xl pl-5">
          <h2 className="font-light">WELCOME</h2>
          {user && (
            <>
              <h2 className="text-bold text-2xl">{user.displayName}</h2>
              <p>{user.email}</p>
            </>
          )}
        <div className="flex flex-row gap-7 items-center justify-center p-4">
            <MiniCard img={Donate} name={"Donate"} />
            <MiniCard img={Request} name={"Find Donor"} />
        </div>
        <div>
          <h1 className="p-4">DONATION REQUEST</h1>
          <div className="flex overflow-x-scroll gap-4 p-4">
            {/* //    <div>
      <h1 className="p-4">DONATION REQUEST</h1>
      <div className="flex overflow-x-scroll gap-4 p-4">
        <Card name={"yash"} location={"ManavRAchna"} bloodGroup={"a"} />
        <Card name={"yash"} location={"ManavRAchna"} bloodGroup={"a"} />
        <Card name={"yash"} location={"ManavRAchna"} bloodGroup={"a"} />
      </div> */}
            {donationRequests.map((prop, index) => (
              <Card
                key={index}
                name={prop.name}
                location={prop.location}
                bloodGroup={prop.bloodGroup}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
