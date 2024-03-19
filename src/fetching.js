import { useEffect, useState } from "react";
export function fetching() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (response.ok) {
          const data = await response.json();
          setMeals(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.log(error.message || "Failed to fetch data");
      }
    };
    fetchMeals();
  }, []);
  return meals
}

export async function addOrder(order){
  try{
    const response = await fetch("http://localhost:3000/orders", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({order: order})
    })
    if (!response.ok){
      throw new Error('Failed to post data')
    }
  } catch(error){
    console.log(error.message || 'Failed to post data')
  }
}
