import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";

export default function FavouriteDashboard() {
  const [mealList, setMealList] = useState([]);
  const [mealListLoaded, setMealListLoaded] = useState(false);
  useEffect(() => {
    if (!mealListLoaded) {
      axios
        .get("http://localhost:5000/likes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setMealList(response.data);
          setMealListLoaded(true);
        });
    }
  }, [mealListLoaded]);
  return (
    <div className="flex justify-between items-center flex-wrap max-w-full bg-[#eae7e7] px-48">
      {mealList.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.recipeId}
            refresh={() => {
              setMealListLoaded(false);
            }}
          />
      ))}
    </div>
  );
}
